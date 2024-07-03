import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import ollama from 'ollama'

/* eslint-disable */
// @ts-ignore: Unreachable code error
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const synth = window.speechSynthesis
let recognition: any

type result = {
  message: string | undefined
  sender?: string | undefined
  time: string | undefined
}

export const useVoiceChatStore = defineStore('voiceChat', () => {
  const onRecord = ref(false)
  const results = ref<result[]>([])
  const textRecord = ref('')
  const textOllama = ref('');

  const runningText = computed((): string => textRecord.value)

  function getDateTime(): string {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric',
      hour12: true // 24-hour format
    }
    var today = new Date()
    // @ts-ignore: Unreachable code error
    return today.toLocaleDateString('id-ID', options).toString().replace('pukul', '')
  }

  function toggleRecord(): void {
    if (!onRecord.value) {
      speechToText()
      onRecord.value = true
    } else {
      stopRecording()
    }
  }

  function stopRecording(): void {
    addResult(textRecord.value)
    textRecord.value = ''
    onRecord.value = false
    recognition.stop()
  }

  function speechToText(): void {
    try {
      recognition = new SpeechRecognition()
      recognition.lang = 'id'
      recognition.interimResults = true
      recognition.start()
      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript
        if (event.results[0].isFinal) {
          textRecord.value += ' ' + speechResult
        }
      }
      recognition.onspeechend = () => {
        if (onRecord) {
          speechToText()
        }
      }
      recognition.onerror = (event: any) => {
        stopRecording()
        if (event.error === 'no-speech') {
          console.log('No speech was detected. Stopping...')
        } else if (event.error === 'aborted') {
          console.log('Listening Stopped.')
        } else if (event.error === 'audio-capture') {
          alert('No microphone was found. Ensure that a microphone is installed.')
        } else if (event.error === 'not-allowed') {
          alert('Permission to use microphone is blocked.')
        } else {
          alert('Error occurred in recognition: ' + event.error)
        }
      }
    } catch (error) {
      onRecord.value = false
      console.log(error)
    }
  }

  // harus ini speechToTextV2
  function toggleRecordV2(): void {
    if (!onRecord.value) {
      recognition.start()
    } else {
      recognition.stop()
    }
  }

  function speechToTextV2(): void {
    try {
      recognition = new SpeechRecognition()
      recognition.lang = 'id'
      recognition.interimResults = true
      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript
        if (event.results[0].isFinal) {
          //action to AI
        }
        textRecord.value = speechResult
      }
      recognition.onstart = () => {
        onRecord.value = true
      }
      recognition.onend = () => {
        if (textRecord.value) {
          results.value.push({
            message: textRecord.value,
            time: getDateTime()
          })
        }
        textRecord.value = ''
        onRecord.value = false
      }
      recognition.onerror = (event: any) => {
        recognition.stop() //hapus jika ingin speech tidak mati, studi kasus, ingin membuat jarfis, tampa mematikan feature
        if (event.error === 'no-speech') {
          console.log('No speech was detected. Stopping...')
        } else if (event.error === 'aborted') {
          console.log('Listening Stopped.')
        } else if (event.error === 'audio-capture') {
          alert('No microphone was found. Ensure that a microphone is installed.')
        } else if (event.error === 'not-allowed') {
          alert('Permission to use microphone is blocked.')
        } else {
          alert('Error occurred in recognition: ' + event.error)
        }
      }
    } catch (error) {
      onRecord.value = false
      console.log(error)
    }
  }

  function textToSpeech(textInput: string = ''): void {
    // Check if speaking
    if (synth.speaking) {
      console.error('Already speaking...')
      return
    }

    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput)
    speakText.onend = (e) => {
      console.log('Done speaking...')
    }
    // Speak error
    speakText.onerror = (e) => {
      console.log(e);
      console.error('Something went wrong')
    }

    speakText.lang = 'id-ID'
    speakText.rate = 1
    speakText.pitch = 1
    // Speak
    synth.speak(speakText)
  }

  function addResult(message: string): void {
    if (message) {
      results.value.push({
        message: message,
        time: getDateTime()
      })
    }
  }
  
  async function featchOllama(question: string) {
    const testMessages = results.value.map((res) => {
      return {
        role: res.sender ? 'system' : 'user',
        content: res.message ?? ""
      };
    })    
    const response = await ollama.chat({ 
      model: 'llama3:latest',
      messages: testMessages,
      stream: true 
    })

    for await (const part of response) {
      textOllama.value += part.message.content
    }
    results.value.push({
      message: textOllama.value,
      time: getDateTime(),
      sender: "AI"
    })
    textToSpeech(textOllama.value)
    textOllama.value = '';
  }

  return {
    onRecord,
    results,
    runningText,
    textOllama,
    toggleRecord,
    textToSpeech,
    speechToTextV2,
    addResult,
    fetchAI: featchOllama
  }
})
