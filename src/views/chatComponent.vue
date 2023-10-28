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
let testpicture = 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132'


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
    console.log('message2',message2)
    naiveChatRef.value?.appendMessage(message2[0]);
    // console.log('receivedData',receivedData)




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


const naiveChatRef = ref<NaiveChatType>()

// user info
const userInfo = {
  nickname: store.state.user.name,
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
            avatar: testpicture,
            lastMessage: '111',
    lastTime: Date.now(),
    index: 'A',
        }));
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
    console.log('ijasdan',contacts.value)
    naiveChatRef.value?.initContacts(contacts.value)  
    // 在 Vue 的 onMounted 钩子或其他适当的地方调用此函数
connectWebSocket();
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
// let timestamp = date.getTime();
let messages: Message[] = [
// {
//     id: '11sasad1',
//     content: '123131',
//     type: 'text',
//     toContactId: 1000,
//     status: 'success',
//     sendTime: timestamp,
//     fromUser: {
//       id: 2,
//       nickname: 'Bob',
//       avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
//     },
    
//   },
//   {
//     id: '11sasad123',
//     content: 'sda213131',
//     type: 'text',
//     toContactId: 2,
//     status: 'success',
//     sendTime:timestamp,
//     fromUser: {
//       id: 1000,
//       nickname: 'King',
//       avatar: testpicture,

//     },
    
//   },
//   {
//     id: '11sasad12',
//     content: '是大啊都是',
//     type: 'text',
//     toContactId: 1000,
//     status: 'success',
//     sendTime: date.getTime(),
//     fromUser: {
//       id: 2,
//       nickname: 'yanping',
//       avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
//     },
    
//   },

//   {
//     id: '1000',
//     content: 'wijnji1111',
//     type: 'text',
//     toContactId: 1000,
//     status: 'success',
//     sendTime: timestamp,
//     fromUser: {
//       id: 3,
//       nickname: 'Charlie',
//       avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
//     },
    
//   }

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
    //test1 = data.chatMessage.toUserId;
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
            avatar: testpicture // 注意：这里是null，你可能想为其设置一个默认值
        }
    };
}
//simulate new message
const message1: Message[] = [

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
      //naiveChatRef.value?.appendMessage(message1[0]);
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