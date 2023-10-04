<template>
<NaiveChat
  ref="naiveChatRef"
  :user-info="userInfo"
  @pull-message="pullMessage"
  @send="send"
/>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { Message } from 'naive-chat'
import type { PullMessageOption, SendOption } from 'naive-chat'
import { NaiveChat,NaiveChatType,Contact} from 'naive-chat'

let socket;

const connectWebSocket = () => {
  // 创建 WebSocket 连接
  const userId = "12345"; // 这应该是动态获取的用户ID
 socket = new WebSocket(`ws://localhost:3000/ws?userId=${userId}`);


  //socket = new WebSocket('ws://localhost:3000/ws');

  // 连接成功事件
  socket.onopen = (event) => {
    console.log('WebSocket 连接成功:', event);
  };

  // 接收消息事件
  socket.onmessage = (event) => {
    console.log('接收到的数据:', event.data);
  };

  // 连接错误事件
  socket.onerror = (event) => {
    console.error('WebSocket 错误:', event);
  };

  // 断开连接事件
  socket.onclose = (event) => {
    if (event.wasClean) {
      console.log(`连接正常关闭, code=${event.code}, reason=${event.reason}`);
    } else {
      console.error('连接异常断开');
    }
  };
};

// 在 Vue 的 onMounted 钩子或其他适当的地方调用此函数
connectWebSocket();
const naiveChatRef = ref<NaiveChatType>()

// user info
const userInfo = {
  nickname: 'King',
  avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
  id: 1000,
}

const contacts = ref<Contact[]>([
  {
    id: 2,
    nickname: 'yanping',
    avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
    lastMessage: '111',
    lastTime: Date.now(),
    index: 'A',
  }
    ,
    {
    id: 3,
    nickname: 'yanping2',
    avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
    lastMessage: '111',
    lastTime: Date.now(),
    index: 'A',
  }
])
let date = new Date();
date.setHours(14, 0, 0, 0); // 设置时间为14:00:00.000
let timestamp = date.getTime();
let messages: Message[] = [
{
    id: '11sasad1',
    content: '123131',
    type: 'text',
    toContactId: 1000,
    status: 'success',
    sendTime: timestamp,
    fromUser: {
      id: 2,
      nickname: 'yanping',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
    },
    
  },
  {
    id: '11sasad12',
    content: '是大啊都是',
    type: 'text',
    toContactId: 1000,
    status: 'success',
    sendTime: Date.now(),
    fromUser: {
      id: 2,
      nickname: 'yanping',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
    },
    
  },
  {
    id: '1000',
    content: 'wijnji1111',
    type: 'text',
    toContactId: 1000,
    status: 'success',
    sendTime: timestamp,
    fromUser: {
      id: 3,
      nickname: 'yanping',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
    },
    
  }

]
const message1: Message[] = [
{
    id: '1001110',
    content: 'wijnji',
    type: 'text',
    toContactId: 3,
    status: 'success',
    sendTime: timestamp,
    fromUser: {
      id: 3,
      nickname: 'yanping',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
    },
    
  }
]
onMounted(() => {
  naiveChatRef.value?.initContacts(contacts.value)  
})
//展示信息的逻辑：用websocket接收到的信息，根据id筛选出来，然后展示出来
//webskect的信息是一个数组，每次接收到信息，都要把信息放到数组里面，然后再筛选出来
//用appendMessage方法，可以提示信息，传入的是这个id的数组的最后一条信息
//顺序：先listen websocket，然后当获取到信息时，放到数组里，然后筛选出来，然后展示出来，
//然后当用户点击pullmessage，就会调用pullmessage方法，然后把筛选出来的信息传入到next方法里面，然后就会在聊天框里渲染出来
const showMessages = ref<Message[]>([]);
  function filterMessagesByContactId(messages: Message[], contactId: number): Message[] 
  {
    //把对应的id的信息筛选出来，然后message里面删除掉
    const relevantMessages = messages.filter(message => message.fromUser.id === contactId);
    return relevantMessages;
}
function pullMessage({ next, contactId }: PullMessageOption) {
  console.log(contactId, 'messages')
  const relevantMessages = filterMessagesByContactId(messages, contactId);
  messages = messages.filter(message => message.fromUser.id !== contactId);
  showMessages.value = relevantMessages;
  console.log(next, 'showMessages')

  if ( showMessages.value.length > 0 ) {
      next(showMessages.value)
      console.log(message1)
      naiveChatRef.value?.appendMessage(message1[0]);
  }
  else {
    asyncFn(() => {
      next([])
    })
  }
}

function asyncFn(fn: () => void) {
  setTimeout(() => {
    fn()
  }, 100)
}

function send({ message, next }: SendOption) {
  asyncFn(() => {
    const messageString = JSON.stringify(message);

// 通过WebSocket发送消息到后端
socket.send(messageString);

    console.log('message',message)
    next({
      id: message.id,
      toContactId: message.toContactId,
      status: 'success',  
    })
  })
}







</script>
<style>
.naive-chat {
  height: 100%;
}
</style>