package com.greenwear.watch

import android.os.Bundle
import android.widget.TextView
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : ComponentActivity() {
    private lateinit var healthDataService: HealthDataService
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // HealthDataService 초기화
        healthDataService = HealthDataService()
        
        setContent {
            GreenWearWatchApp(healthDataService)
        }
    }
    
    override fun onDestroy() {
        super.onDestroy()
        healthDataService.stopHealthDataCollection()
    }
}

@Composable
fun GreenWearWatchApp(healthDataService: HealthDataService) {
    var heartRate by remember { mutableStateOf(0) }
    var steps by remember { mutableStateOf(0) }
    var batteryLevel by remember { mutableStateOf(0) }
    var isConnected by remember { mutableStateOf(false) }
    var lastUpdate by remember { mutableStateOf("") }
    
    // 실시간 데이터 업데이트
    LaunchedEffect(Unit) {
        while (true) {
            heartRate = healthDataService.getCurrentHeartRate()
            steps = healthDataService.getCurrentSteps()
            batteryLevel = healthDataService.getBatteryLevel()
            isConnected = healthDataService.isServerConnected()
            
            val sdf = SimpleDateFormat("HH:mm:ss", Locale.getDefault())
            lastUpdate = sdf.format(Date())
            
            delay(1000) // 1초마다 업데이트
        }
    }
    
    MaterialTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = Color(0xFF1E1E1E)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                // 앱 제목
                Text(
                    text = "🌱 GreenWear",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                
                Spacer(modifier = Modifier.height(20.dp))
                
                // 심박수 카드
                HealthCard(
                    title = "심박수",
                    value = "${heartRate} BPM",
                    color = Color(0xFFE74C3C)
                )
                
                Spacer(modifier = Modifier.height(12.dp))
                
                // 걸음 수 카드
                HealthCard(
                    title = "걸음 수",
                    value = "${steps} 걸음",
                    color = Color(0xFF2ECC71)
                )
                
                Spacer(modifier = Modifier.height(12.dp))
                
                // 배터리 카드
                HealthCard(
                    title = "배터리",
                    value = "${batteryLevel}%",
                    color = Color(0xFFF39C12)
                )
                
                Spacer(modifier = Modifier.height(20.dp))
                
                // 연결 상태
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .background(
                                if (isConnected) Color.Green else Color.Red,
                                RoundedCornerShape(4.dp)
                            )
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = if (isConnected) "서버 연결됨" else "연결 끊김",
                        color = if (isConnected) Color.Green else Color.Red,
                        fontSize = 12.sp
                    )
                }
                
                Spacer(modifier = Modifier.height(8.dp))
                
                // 마지막 업데이트 시간
                Text(
                    text = "업데이트: $lastUpdate",
                    color = Color.Gray,
                    fontSize = 10.sp
                )
            }
        }
    }
}

@Composable
fun HealthCard(
    title: String,
    value: String,
    color: Color
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(60.dp),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF2C2C2C))
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = title,
                color = Color.White,
                fontSize = 14.sp
            )
            Text(
                text = value,
                color = color,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}
