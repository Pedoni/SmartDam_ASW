package com.example.smartdamapp;

import androidx.appcompat.app.AppCompatActivity;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;


import com.example.smartdamapp.btlib.*;
import com.example.smartdamapp.btlib.exceptions.BluetoothDeviceNotFound;
import com.example.smartdamapp.utils.C;

import java.util.Objects;
import java.util.UUID;

public class MainActivity extends AppCompatActivity {

    static public BluetoothChannel btChannel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final BluetoothAdapter btAdapter = BluetoothAdapter.getDefaultAdapter();

        if(btAdapter != null && !btAdapter.isEnabled()){
            startActivityForResult(new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE), C.bluetooth.ENABLE_BT_REQUEST);
        }

        initUI();
    }

    private void initUI() {
        Button manual = findViewById(R.id.buttonManual);

        manual.setOnClickListener(v -> {
            Intent intentM = new Intent (this , ManualActivity.class );
            startActivity(intentM);
        });

        //Bluetooth
        try {
            connectToBTServer();
        } catch (BluetoothDeviceNotFound bluetoothDeviceNotFound) {
            bluetoothDeviceNotFound.printStackTrace();
        }

        //HTTP
        final ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        final NetworkInfo activeNetwork = Objects.requireNonNull(cm).getActiveNetworkInfo();
        if(activeNetwork.isConnectedOrConnecting()){
            CharSequence text = "Network is connected";
            Toast toast = Toast.makeText(getApplicationContext(), text, Toast.LENGTH_SHORT);
            toast.show();
        }
    }

    private void connectToBTServer() throws BluetoothDeviceNotFound {
        final BluetoothDevice serverDevice = BluetoothUtils.getPairedDeviceByName(C.bluetooth.BT_DEVICE_ACTING_AS_SERVER_NAME);

        final UUID uuid = BluetoothUtils.getEmbeddedDeviceDefaultUuid();
        //final UUID uuid = BluetoothUtils.generateUuidFromString(C.bluetooth.BT_SERVER_UUID);

        new ConnectToBluetoothServerTask(serverDevice, uuid, new ConnectionTask.EventListener() {

            @Override
            public void onConnectionActive(final BluetoothChannel channel) {
                btChannel = channel;

                CharSequence text = "Device connected";
                Toast toast = Toast.makeText(getApplicationContext(), text, Toast.LENGTH_SHORT);
                toast.show();
            }

            @Override
            public void onConnectionCanceled() {
                CharSequence text = "Device disconnected";
                Toast toast = Toast.makeText(getApplicationContext(), text, Toast.LENGTH_SHORT);
                toast.show();
            }
        }).execute();

    }

    @Override
    protected void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == C.bluetooth.ENABLE_BT_REQUEST && resultCode == RESULT_OK) {
            Log.d(C.APP_LOG_TAG, "Bluetooth enabled!");
        }

        if (requestCode == C.bluetooth.ENABLE_BT_REQUEST && resultCode == RESULT_CANCELED) {
            Log.d(C.APP_LOG_TAG, "Bluetooth not enabled!");
        }
    }

}