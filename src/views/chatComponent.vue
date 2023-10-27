<template>
<NaiveChat
  ref="naiveChatRef"
  :user-info="userInfo"
  @pull-message="pullMessage"
  @send="send"
>
  <template v-slot:sidebar-header>
    <!-- 你的自定义内容 -->
    <span></span>
  </template>
  <template v-slot:default-page		>
    <!-- 你的自定义内容 -->
    <span>asassa</span>
  </template>
  
</NaiveChat>

</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { Message } from 'naive-chat'
import type { PullMessageOption, SendOption } from 'naive-chat'
import { NaiveChat,NaiveChatType,Contact} from 'naive-chat'

import { useStore } from 'vuex';
const store = useStore();

let socket;

document.addEventListener("DOMContentLoaded", function() {
// 使用属性选择器来选择你提供的div
let div = document.querySelector('div[h-60px][flex-1][overflow-auto][px-20px][py-5px][text-left][outline-none][contenteditable="true"]');

if (div) {
    // 在这个div的上下文中搜索按钮
    let button = div.querySelector('button');
    if (button && button.textContent === " 发送 ") {
        button.textContent = "send message";
    }
}

});
let testpicture = ''
const connectWebSocket = () => {
  // 创建 WebSocket 连接
  const userId = store.state.user.id; // 这应该是动态获取的用户ID
 socket = new WebSocket(`ws://localhost:3000/ws/chat?userId=${userId}`);

  // socket = new WebSocket('ws://localhost:3000/ws');

  // 连接成功事件
  socket.onopen = (event) => {
    console.log('WebSocket 连接成功:', event);
  };
/* eslint-disable */ 
  function isValidBase64(str) {
    if (typeof str !== 'string') return false;

    // Base64 should have padding with '=' character, but not always required
    const unpadded = str.trim().replace(/=+$/, '');

    // Check if it has valid Base64 characters
    if (!/^[A-Za-z0-9+/]*$/.test(unpadded)) return false;

    // Try decoding it. If it fails, it's probably not valid Base64.
    try {
        const decoded = atob(unpadded);
    } catch (e) {
        return false;
    }

    return true;
}

// 接收消息事件
socket.onmessage = (event) => {
     //console.log('接收到的数据:', event.data);

    // 解析JSON字符串为对象
    let receivedData = JSON.parse(event.data);
    convertToMessageFormat(receivedData);
    let message2: Message[] = [convertToMessageFormat(receivedData)]
    naiveChatRef.value?.appendMessage(message2[0]);
    // console.log('receivedData',receivedData)
    let base64Image = 'data:image/jpg;base64,' +'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';
// console.log(base64Image)
// console.log(base64Image.toString())
    let img = document.createElement('jpg');
img.src = base64Image;
testpicture = base64Image;

document.body.appendChild(img);

    // 检查receivedData中是否有profile属性
    if (receivedData.fromUser.hasOwnProperty('profile')) {
        if (isValidBase64(receivedData.fromUser.profile)) {
            console.log('profile是一个有效的Base64字符串');
        } else {
            console.log('profile不是一个有效的Base64字符串');
        }
    } else {
        console.log('receivedData中没有profile属性');
    }

    // 将Unix时间戳转换为Date对象
    let date1 = new Date(receivedData.sendTime);

    // 打印格式化的日期时间
    // console.log(date1.toLocaleString());
    //naiveChatRef.value?.appendMessage(message1[0]);

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
  avatar: testpicture,
  id: store.state.user.id,
}
//向http://localhost:3000/api1/users/1/contacts发送请求，获取到联系人的信息
const contacts = ref<Contact[]>([]);

const fetchContacts = async () => {
    try {
      //根据当前id获取到联系人的信息
      const userId = store.state.user.id;
const response = await fetch(`http://localhost:3000/api1/users/${userId}/contacts`);

      if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        console.log('qasz',data)
         // eslint-disable-next-line 
        contacts.value = data.map(contact => ({
            id: contact.contactId, // 这取决于你的API返回的数据结构
            // ... 其他字段，例如nickname, avatar等
            nickname: contact.username,
            avatar: 'data:image/jpg;base64,' + contact.profile,
            lastMessage: '111',
    lastTime: Date.now(),
    index: 'A',
        }));
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
    console.log('ijn',contacts.value)
    naiveChatRef.value?.initContacts(contacts.value)  
}

// 调用函数以获取联系人
fetchContacts();

// contacts info
// const contacts = ref<Contact[]>([
//   {
//     id: 2,
//     nickname: 'yanping',
//     avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
//     lastMessage: '111',
//     lastTime: Date.now(),
//     index: 'A',
//   }
//     ,
//     {
//     id: 3,
//     nickname: 'yanping2',
//     avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
//     lastMessage: '111',
//     lastTime: Date.now(),
//     index: 'A',
//   }
// ])
// console.log(contacts.value)
//simulate messages history
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
      nickname: 'Bob',
      avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    },
    
  },
  {
    id: '11sasad123',
    content: 'sda213131',
    type: 'text',
    toContactId: 2,
    status: 'success',
    sendTime:timestamp,
    fromUser: {
      id: 1000,
      nickname: 'King',
      avatar: testpicture,

    },
    
  },
  {
    id: '11sasad12',
    content: '是大啊都是',
    type: 'text',
    toContactId: 1000,
    status: 'success',
    sendTime: date.getTime(),
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
      nickname: 'Charlie',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
    },
    
  }

]
const convertToMessageFormat = (data) => {
  console.log('data',data)
    // 检查data是否有chatMessage和fromUser属性
  if (!data.chatMessage) {
        console.error("Data doesn't have a chatMessage property:", data);
        return;
    }
    
    if (!data.fromUser) {
        console.error("Data doesn't have a fromUser property:", data);
        return;
    }
    //如果toUserId和当前用户的id相同，那么就是接收到的信息
    //如果是的话，就让test1 等于data.fromUser.userId，如果不是，就让test1为toUserId
    let test1;
    if (parseInt(data.chatMessage.toUserId) === store.state.user.id) {
      test1 = data.fromUser.userId;
    }
    else {
      test1 = data.chatMessage.toUserId;
    }
    // if (data.chatMessage.toUserId === store.state.user.id) {
    //     return {
    //         id: Date.now().toString(), // 这里我只是用了当前时间戳作为消息ID，你可以根据需要更改
    //         content: data.chatMessage.content,
    //         type: 'text', // 因为你没有提供消息类型，所以我假设它总是"text"
    //         toContactId: data.fromUser.userId,
    //         status: (data.chatMessage.status ===  "success"), // 这里，我假设"unread"对应于"success"
    //         sendTime: data.chatMessage.sendTime,
    //         fromUser: {
    //             id: data.fromUser.userId,
    //             nickname: data.fromUser.username,
    //             avatar: data.fromUser.profile // 注意：这里是null，你可能想为其设置一个默认值
    //         }
    //     };
    // }
    return {
        id: Date.now().toString(), // 这里我只是用了当前时间戳作为消息ID，你可以根据需要更改
        content: data.chatMessage.content,
        type: 'text', // 因为你没有提供消息类型，所以我假设它总是"text"
        toContactId: parseInt(test1),
        status: (data.chatMessage.status ===  "success"), // 这里，我假设"unread"对应于"success"
        sendTime: data.chatMessage.sendTime,
        fromUser: {
            id: data.fromUser.userId,
            nickname: data.fromUser.username,
            avatar: data.fromUser.profile // 注意：这里是null，你可能想为其设置一个默认值
        }
    };
}
//simulate new message
const message1: Message[] = [
{
    id: '1001111110',
    content: 'wijnji',
    type: 'text',
    toContactId: 13,
    status: 'success',
    sendTime: timestamp,
    fromUser: {
      id: store.state.user.id,
      nickname: 'King',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
    },
  },
  {
    id: '1001110',
    content: 'wijnji',
    type: 'text',
    toContactId: 2,
    status: 'success',
    sendTime: timestamp,
    fromUser: {
      id: 3,
      nickname: 'yanping',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
    },
    
  }
]
//初始化联系人
// onMounted(() => {
//   naiveChatRef.value?.initContacts(contacts.value)  
// })
//展示信息的逻辑：用websocket接收到的信息，根据id筛选出来，然后展示出来
//webskect的信息是一个数组，每次接收到信息，都要把信息放到数组里面，然后再筛选出来
//用appendMessage方法，可以提示信息，传入的是这个id的数组的最后一条信息
//顺序：先listen websocket，然后当获取到信息时，放到数组里，然后筛选出来，然后展示出来，
//然后当用户点击pullmessage，就会调用pullmessage方法，然后把筛选出来的信息传入到next方法里面，然后就会在聊天框里渲染出来
const showMessages = ref<Message[]>([]);
  function filterMessagesByContactId(messages: Message[], contactId: number): Message[] 
{
  const relevantMessages = messages.filter(message => message.fromUser.id === contactId || message.toContactId === contactId);
  return relevantMessages;
}

function pullMessage({ next, contactId }: PullMessageOption) {
  const relevantMessages = filterMessagesByContactId(messages, contactId);
  messages = messages.filter(message => message.fromUser.id !== contactId && message.toContactId !== contactId);
  console.log(relevantMessages, 'showMessages')
  showMessages.value = relevantMessages;
  
  if ( showMessages.value.length > 0 ) {
      next(showMessages.value)
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

function send({ message,next}: SendOption) {
  asyncFn(() => {
    let message3 = message;
    //修改message3的id
    message3.fromUser.id =store.state.user.id ;
    const messageString = JSON.stringify(message3);
    
// 通过WebSocket发送消息到后端
    socket.send(messageString);
    console.log('message',message3)
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