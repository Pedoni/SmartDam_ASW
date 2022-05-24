package com.example.smartdamapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.TextView;

import com.example.smartdamapp.netutils.Http;
import com.example.smartdamapp.utils.C;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.HttpURLConnection;

public class ManualActivity extends AppCompatActivity {

    boolean manual = false;

    private Button back;
    private Button manualButton;
    private Button autoButton;
    private Button closeDamButton;
    private Button set20Button;
    private Button set40Button;
    private Button set60Button;
    private Button set80Button;
    private Button openButton;
    private TextView isManualView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_manual);

        initUI();
    }

    private void initUI() {
        this.back = findViewById(R.id.backButtonM);
        this.back.setOnClickListener(v -> {
            Intent intentM = new Intent (this , MainActivity.class );
            startActivity(intentM);
        });

        this.manualButton = findViewById(R.id.manualButton);
        this.manualButton.setOnClickListener(v -> {
            MainActivity.btChannel.sendMessage("0 1");
        });

        this.autoButton = findViewById(R.id.autoButton);
        this.autoButton.setOnClickListener(v -> {
            MainActivity.btChannel.sendMessage("0 0");
        });

        this.closeDamButton = findViewById(R.id.closeDamButton);
        this.closeDamButton.setOnClickListener(v -> {
            MainActivity.btChannel.sendMessage("1 0");
        });

        this.set20Button = findViewById(R.id.set20Button);
        this. set20Button.setOnClickListener(v -> {
            MainActivity.btChannel.sendMessage("1 20");
        });

        this.set40Button = findViewById(R.id.set40Button);
        this.set40Button.setOnClickListener(v -> {
            MainActivity.btChannel.sendMessage("1 40");
        });

        this.set60Button = findViewById(R.id.set60Button);
        this.set60Button.setOnClickListener(v -> {
            MainActivity.btChannel.sendMessage("1 60");
        });

        this.set80Button = findViewById(R.id.set80Button);
        this.set80Button.setOnClickListener(v -> {
            MainActivity.btChannel.sendMessage("1 80");
        });

        this.openButton = findViewById(R.id.openButton);
        this.openButton.setOnClickListener(v -> {
            MainActivity.btChannel.sendMessage("1 100");
        });

        this.isManualView = findViewById(R.id.isManualView);

        new Thread(()->{
            while(true) {
                try {
                    Thread.sleep(300);
                    tryHttpGet();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();

    }

    @Override
    protected void onStop() {
        super.onStop();

        MainActivity.btChannel.close();
    }

    private void tryHttpGet(){
        final String url = "http://192.168.1.126:8080/api/dashboard";

        Http.get(url, response -> {
            if(response.code() == HttpURLConnection.HTTP_OK){
                try {
                    JSONArray jsa = new JSONArray(response.contentAsString());
                    JSONObject jso = jsa.getJSONObject(0);
                    JSONObject jso2 = jsa.getJSONObject(1);

                    if(jso.getString("Manual").equals("true")){
                        this.manual = true;
                    } else if(jso.getString("Manual").equals("false")){
                        this.manual = false;
                    }

                    if(jso.getString("State").equals("0")){
                        disableAll();
                        String n = "NORMAL";
                        String level = "Water height: " + Float.toString(5 - Float.parseFloat(jso2.getString("value"))) + " cm";
                        String dam = "Closed dam";
                        ((TextView)findViewById(R.id.viewState)).setText(n);
                        ((TextView)findViewById(R.id.viewState)).setTextColor(Color.WHITE);
                        ((TextView)findViewById(R.id.viewLevel)).setText(level);
                        ((TextView)findViewById(R.id.viewDam)).setText(dam);
                    } else if(jso.getString("State").equals("1")){
                        disableAll();
                        String p = "PRE";
                        String level = "Water height: " + Float.toString(5 - Float.parseFloat(jso2.getString("value"))) + " cm";
                        String dam = "Closed dam";
                        ((TextView)findViewById(R.id.viewState)).setText(p);
                        ((TextView)findViewById(R.id.viewState)).setTextColor(Color.YELLOW);
                        ((TextView)findViewById(R.id.viewLevel)).setText(level);
                        ((TextView)findViewById(R.id.viewDam)).setText(dam);
                    } else if(jso.getString("State").equals("2")){
                        if(this.manual){
                            enableAll();
                            this.manualButton.setEnabled(false);
                            manualButton.setBackgroundColor(Color.TRANSPARENT);
                            this.isManualView.setText("MANUAL");
                        } else {
                            disableAll();
                            this.manualButton.setEnabled(true);
                            manualButton.setBackgroundColor(Color.BLUE);
                            this.isManualView.setText("AUTO");
                        }
                        String a = "ALARM";
                        String level = "Water height: " + Float.toString(5 - Float.parseFloat(jso2.getString("value"))) + " cm";
                        String dam = "Dam: " + jso.getString("Opening");
                        ((TextView)findViewById(R.id.viewState)).setText(a);
                        ((TextView)findViewById(R.id.viewState)).setTextColor(Color.RED);
                        ((TextView)findViewById(R.id.viewLevel)).setText(level);
                        ((TextView)findViewById(R.id.viewDam)).setText(dam);
                    }

                } catch (IOException | JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private void disableAll(){
        manualButton.setEnabled(false);
        autoButton.setEnabled(false);
        closeDamButton.setEnabled(false);
        set20Button.setEnabled(false);
        set40Button.setEnabled(false);
        set60Button.setEnabled(false);
        set80Button.setEnabled(false);
        openButton.setEnabled(false);

        manualButton.setBackgroundColor(Color.TRANSPARENT);
        autoButton.setBackgroundColor(Color.TRANSPARENT);
        closeDamButton.setBackgroundColor(Color.TRANSPARENT);
        set20Button.setBackgroundColor(Color.TRANSPARENT);
        set40Button.setBackgroundColor(Color.TRANSPARENT);
        set60Button.setBackgroundColor(Color.TRANSPARENT);
        set80Button.setBackgroundColor(Color.TRANSPARENT);
        openButton.setBackgroundColor(Color.TRANSPARENT);
    }

    private void enableAll(){
        manualButton.setEnabled(true);
        autoButton.setEnabled(true);
        closeDamButton.setEnabled(true);
        set20Button.setEnabled(true);
        set40Button.setEnabled(true);
        set60Button.setEnabled(true);
        set80Button.setEnabled(true);
        openButton.setEnabled(true);

        manualButton.setBackgroundColor(Color.BLUE);
        autoButton.setBackgroundColor(Color.BLUE);
        closeDamButton.setBackgroundColor(Color.RED);
        set20Button.setBackgroundColor(Color.rgb(255, 152, 0));
        set40Button.setBackgroundColor(Color.rgb(255, 152, 0));
        set60Button.setBackgroundColor(Color.rgb(255, 152, 0));
        set80Button.setBackgroundColor(Color.rgb(255, 152, 0));
        openButton.setBackgroundColor(Color.GREEN);
    }

}