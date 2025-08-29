<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center p-6">
    <header class="w-full max-w-4xl flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">GreenWear Dashboard</h1>
      <div class="flex gap-2">
        <button @click="connectBLE" class="px-4 py-2 rounded-xl bg-black text-white">Connect BLE</button>
        <button @click="toggleDemo" class="px-4 py-2 rounded-xl bg-gray-200">Demo: {{ demo ? 'ON' : 'OFF' }}</button>
      </div>
    </header>

    <main class="w-full max-w-4xl grid md:grid-cols-3 gap-6">
      <!-- Status card -->
      <section class="md:col-span-1 p-6 bg-white rounded-2xl shadow">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Status</h2>
          <span class="text-sm text-gray-500">{{ connected ? 'BLE Connected' : 'Disconnected' }}</span>
        </div>
        <div class="mt-6 flex flex-col items-center">
          <div class="w-40 h-40 rounded-full transition-all duration-300"
               :style="{ backgroundColor: state.color }"
               :class="pulseClass">
          </div>
          <p class="mt-4 text-xl font-semibold">{{ state.label }}</p>
          <p class="text-gray-500 text-sm">Mode: {{ vitals.mode }}</p>
        </div>
      </section>

      <!-- Vitals table -->
      <section class="md:col-span-2 p-6 bg-white rounded-2xl shadow">
        <h2 class="text-lg font-semibold mb-4">Vitals</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-xl border">
            <p class="text-gray-500 text-sm">HR</p>
            <p class="text-2xl font-bold">{{ vitals.hr }} <span class="text-sm">bpm</span></p>
          </div>
          <div class="p-4 rounded-xl border">
            <p class="text-gray-500 text-sm">RR</p>
            <p class="text-2xl font-bold">{{ vitals.rr }} <span class="text-sm">/min</span></p>
          </div>
          <div class="p-4 rounded-xl border">
            <p class="text-gray-500 text-sm">SpO₂</p>
            <p class="text-2xl font-bold">{{ vitals.spo2 }} <span class="text-sm">%</span></p>
          </div>
          <div class="p-4 rounded-xl border">
            <p class="text-gray-500 text-sm">Core Temp</p>
            <p class="text-2xl font-bold">{{ vitals.core.toFixed(1) }} <span class="text-sm">℃</span></p>
          </div>
          <div class="p-4 rounded-xl border">
            <p class="text-gray-500 text-sm">Skin ΔT</p>
            <p class="text-2xl font-bold">{{ vitals.skinDelta.toFixed(1) }} <span class="text-sm">℃</span></p>
          </div>
          <div class="p-4 rounded-xl border">
            <p class="text-gray-500 text-sm">Minutes</p>
            <p class="text-2xl font-bold">{{ vitals.minutes }}</p>
          </div>
        </div>

        <div class="mt-6 flex gap-2">
          <button @click="sendPreset('rest')" class="px-3 py-2 rounded-lg bg-gray-100">Preset: Rest</button>
          <button @click="sendPreset('exercise')" class="px-3 py-2 rounded-lg bg-gray-100">Preset: Exercise</button>
          <button @click="sendCSV" class="px-3 py-2 rounded-lg bg-black text-white">Send CSV → Device</button>
        </div>
      </section>

      <!-- Alerts -->
      <section class="md:col-span-3 p-6 bg-white rounded-2xl shadow">
        <h2 class="text-lg font-semibold mb-4">Alerts</h2>
        <ul class="space-y-2 max-h-48 overflow-auto">
          <li v-for="(msg, i) in alerts" :key="i" class="text-sm text-gray-700">{{ msg }}</li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const demo = ref(false)
const connected = ref(false)
const device = ref<BluetoothDevice | null>(null)
let statusChar: BluetoothRemoteGATTCharacteristic | null = null
let cmdChar: BluetoothRemoteGATTCharacteristic | null = null

const vitals = ref({
  mode: 'rest' as 'rest' | 'exercise',
  hr: 82,
  rr: 16,
  spo2: 97,
  core: 36.7,
  skinDelta: 0.2,
  minutes: 5
})
const state = ref({ color: '#22c55e', label: '정상' })
const alerts = ref<string[]>([])

const pulseClass = computed(() => (state.value.label === '경고' ? 'animate-pulse' : ''))

function toggleDemo(){ demo.value = !demo.value }

async function connectBLE(){
  try{
    const svcUUID = '6b1d0001-2c6c-4b1f-9f1a-0e5a8a000001'
    const statusUUID = '6b1d0002-2c6c-4b1f-9f1a-0e5a8a000002'
    const cmdUUID = '6b1d0003-2c6c-4b1f-9f1a-0e5a8a000003'

    device.value = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'GREENWEAR' }],
      optionalServices: [svcUUID]
    })
    const server = await device.value!.gatt!.connect()
    const svc = await server.getPrimaryService(svcUUID)
    statusChar = await svc.getCharacteristic(statusUUID)
    cmdChar = await svc.getCharacteristic(cmdUUID)

    await statusChar.startNotifications()
    statusChar.addEventListener('characteristicvaluechanged', (e: any) => {
      const dec = new TextDecoder().decode(e.target.value)
      try{
        const j = JSON.parse(dec)
        state.value = { color: j.color || '#22c55e', label: j.label || '정상' }
        // Optionally mirror vitals
        if (j.hr) vitals.value.hr = j.hr
        if (j.rr) vitals.value.rr = j.rr
        if (j.spo2) vitals.value.spo2 = j.spo2
        if (j.core) vitals.value.core = j.core
        if (j.skinDelta) vitals.value.skinDelta = j.skinDelta
        if (j.minutes) vitals.value.minutes = j.minutes
        alerts.value.unshift(`[${new Date().toLocaleTimeString()}] ${state.value.label} (${state.value.color})`)
      }catch(_){}
    })

    connected.value = true
    alerts.value.unshift('BLE connected.')
    device.value!.addEventListener('gattserverdisconnected', () => {
      connected.value = false
      alerts.value.unshift('BLE disconnected.')
    })
  }catch(err:any){
    console.error(err)
    alerts.value.unshift('BLE connection failed: ' + err.message)
  }
}

async function sendCSV(){
  if (!cmdChar){ alerts.value.unshift('Not connected.'); return; }
  const csv = `mode=${vitals.value.mode};hr=${vitals.value.hr};rr=${vitals.value.rr};spo2=${vitals.value.spo2};core=${vitals.value.core};age=30;skinDelta=${vitals.value.skinDelta};minutes=${vitals.value.minutes}`
  await cmdChar.writeValue(new TextEncoder().encode(csv))
  alerts.value.unshift('Sent CSV: ' + csv)
}

function sendPreset(kind:'rest'|'exercise'){
  if (kind==='rest'){
    vitals.value.mode='rest'; vitals.value.hr=84; vitals.value.rr=16; vitals.value.spo2=97; vitals.value.core=36.8; vitals.value.skinDelta=0.2; vitals.value.minutes=5;
  } else {
    vitals.value.mode='exercise'; vitals.value.hr=150; vitals.value.rr=22; vitals.value.spo2=95; vitals.value.core=37.2; vitals.value.skinDelta=0.5; vitals.value.minutes=10;
  }
}

let timer:any=null
onMounted(()=>{
  timer = setInterval(()=>{
    if (demo.value){
      // simple demo change
      const t = Date.now()/1000
      const phase = Math.sin(t/3)
      vitals.value.hr = Math.round(80 + 20*phase + 20*Math.random())
      vitals.value.rr = 16 + Math.round(3*Math.random())
      vitals.value.spo2 = 95 + Math.round(3*Math.random())
      vitals.value.core = 36.6 + (Math.random()*0.6)
      // naive local color mirror
      const red = vitals.value.hr>120 || vitals.value.spo2<=90 || vitals.value.core>=38.0
      const yellow = (!red) && (vitals.value.hr>100 || vitals.value.spo2<=94 || vitals.value.core>=37.5)
      state.value = red ? {color:'#ef4444', label:'경고'} : yellow ? {color:'#fbbf24', label:'주의'} : {color:'#22c55e', label:'정상'}
    }
  }, 1200)
})
onUnmounted(()=>{ if (timer) clearInterval(timer) })
</script>
