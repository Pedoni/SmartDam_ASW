package com.example.smartdamapp.netutils;

import android.os.AsyncTask;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class Http {

    public interface Listener{
        void onHttpResponseAvailable(final HttpResponse response);
    }

    public static void get(final String url, final Listener listener){
        new AsyncTask<Void, Void, HttpResponse>(){
            @Override
            protected HttpResponse doInBackground(Void... voids) {
                final HttpURLConnection connection;
                try {
                    connection = (HttpURLConnection) new URL(url).openConnection();
                    connection.setRequestMethod("GET");

                    return new HttpResponse(connection.getResponseCode(), connection.getInputStream());

                } catch (IOException e) {
                    return null;
                }
            }

            @Override
            protected void onPostExecute(HttpResponse response) {
                listener.onHttpResponseAvailable(response);
            }
        }.execute();
    }

    public static void post(final String url, final byte[] payload, final Listener listener){
        new AsyncTask<Void, Void, HttpResponse>(){
            @Override
            protected HttpResponse doInBackground(Void... voids) {
                final HttpURLConnection connection;
                try {
                    connection = (HttpURLConnection) new URL(url).openConnection();
                    connection.setRequestMethod("POST");
                    connection.setDoOutput(true);
                    connection.getOutputStream().write(payload);

                    return new HttpResponse(connection.getResponseCode(), connection.getInputStream());
                } catch (IOException e) {
                    return null;
                }
            }

            @Override
            protected void onPostExecute(HttpResponse response) {
                listener.onHttpResponseAvailable(response);
            }
        }.execute();
    }
}
