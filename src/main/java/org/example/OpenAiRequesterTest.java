package org.example;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.fail;

class OpenAIRequesterTest {

    // URL del endpoint de OpenAI para completions. No debería necesitar cambios.
    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    // Tu API key de OpenAI. ¡NO la compartas ni la expongas públicamente!
    private static final String API_KEY = "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";

    // Nombre del modelo que deseas usar. Puedes cambiarlo por otro modelo si lo prefieres.
    private static final String MODEL_NAME = "gpt-3.5-turbo";

    @Test
    public void testOpenAIRequest() {
        try {
            String query = "Hola, ¿qué tal?";
            String rawResponse = makeOpenAIRequest(query);

            // Parsea la respuesta JSON y obtiene el contenido.
            String content = new JSONObject(rawResponse)
                    .getJSONArray("choices")
                    .getJSONObject(0)
                    .getJSONObject("message")
                    .getString("content");

            System.out.println("Prompt entrada: " + query + "\n\nPrompt salida: " + content);

            // Asegúrate de que el contenido no esté vacío.
            assertNotNull(content, "El nodo 'content' no debe ser nulo");

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            fail(e.getMessage());
        }
    }

    /**
     * Realiza una solicitud a la API de OpenAI y retorna la respuesta como una cadena.
     *
     * @param query El texto que deseas que el modelo complete o responda.
     * @return Respuesta del modelo en formato de cadena.
     * @throws IOException Si hay problemas al hacer la solicitud.
     */
    public String makeOpenAIRequest(String query) throws IOException {

        // Establece la conexión y las cabeceras.
        HttpURLConnection connection = (HttpURLConnection) new URL(API_URL).openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Authorization", "Bearer " + API_KEY);
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        // Prepara el cuerpo de la solicitud con el modelo y el texto.
        String body = String.format("{\"model\": \"%s\", \"messages\": [{\"role\": \"user\", \"content\": \"%s\"}]}",
                MODEL_NAME, query.replace("\"", "\\\""));

        // Envía la solicitud.
        try (OutputStream os = connection.getOutputStream()) {
            os.write(body.getBytes("UTF-8"));
        }

        // Lee y devuelve la respuesta.
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                throw new IOException("HTTP error code: " + connection.getResponseCode());
            }

            StringBuilder responseBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                responseBuilder.append(line);
            }
            System.out.println(responseBuilder.toString());
            return responseBuilder.toString();
        }
    }
    public String getAssistantResponse(String query) throws IOException {
        String rawResponse = makeOpenAIRequest(query);

        // Parse the JSON response and get the assistant's content.
        JSONObject jsonResponse = new JSONObject(rawResponse);
        JSONArray choices = jsonResponse.getJSONArray("choices");

        if (choices.length() > 0) {
            JSONObject assistantMessage = choices.getJSONObject(0).getJSONObject("message");
            return assistantMessage.getString("content");
        } else {
            throw new RuntimeException("No assistant response found in the API response.");
        }
    }
}