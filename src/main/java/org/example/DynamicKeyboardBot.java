package org.example;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

class OpenAIGpt3Client {

    private static final String OPENAI_API_KEY = "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";
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions";


    public static String getGpt3Response(String prompt) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(OPENAI_API_URL))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + OPENAI_API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString("{\"prompt\": \"" + prompt + "\"}"))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 200) {
            return response.body();
        } else {
            throw new IOException("Unexpected response from OpenAI API: " + response.statusCode());
        }
    }
}

public class DynamicKeyboardBot extends TelegramLongPollingBot {
    String replyText = "...";
    String sent = "";
    private final OpenAIGpt3Client chatgpt = new OpenAIGpt3Client();
    OpenAIRequesterTest ai = new OpenAIRequesterTest();
    @Override
    public void onUpdateReceived(Update update) {
        String responseMessage = "Text copied";
        if (update.hasMessage()) {
            Message message = update.getMessage();
            long chatId = message.getChatId();
            if (message.hasText()) {

                sent = message.getText();
                System.out.println(sent);
                //replyText = " I love you red alem";
            }
            SendMessage sendMessage = new SendMessage();
            sendMessage.setChatId(chatId);
            try {
                System.out.println("trying");
                //replyText = chatgpt.getGpt3Response(sent);
                replyText = ai.getAssistantResponse(sent);
                System.out.println(1);
            } catch (Exception e) {
                replyText = "There was an error, please resend query";
                System.out.println("Error communicating with OpenAI API");
                e.printStackTrace();
                throw new RuntimeException("Error communicating with OpenAI API", e);
            }
            sendMessage.setText(replyText);
            System.out.println("user detected" + message.getUserShared());
            System.out.println(message.getText());

            try {
                execute(sendMessage);
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public String getBotUsername() {
        return "@Liras_bot";
    }

    @Override
    public String getBotToken() {
        return "931695854:AAHIDgmeoEAGYjKhy8TNU7-FWVemGiFGnko";
    }

    public static void main(String[] args){
        try{
            TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
            botsApi.registerBot(new DynamicKeyboardBot());
        }catch(TelegramApiException e){
            e.printStackTrace();
        }
    }
}