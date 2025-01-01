document.querySelector('.glow-on-hover').addEventListener('click', () => {
    var result = confirm('还没想好展示什么');
    if(result == true){
    var result= confirm('骗你的^~^,有惊喜呦');
    }
    if(result == true){
        var result= confirm('你在期待什么^-^');}
    if(result == true){
        var result= confirm('这么相信我？');}
    if(result == true){
        var result= confirm('好了，不骗你了，准备接受这比较潦草的网页吧');}
    if(result == true){
        window.location.href="jinxi.html";
    }
});
      document.addEventListener('DOMContentLoaded', function() {
          const audio = document.getElementById('bgMusic');
          const playBtn = document.getElementById('playBtn');
          
          // 点击按钮播放音乐
          playBtn.addEventListener('click', function() {
              if (audio.paused) {
                  audio.play().then(() => {
                      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                  }).catch(err => {
                      console.error('播放失败:', err);
                  });
              } else {
                  audio.pause();
                  playBtn.innerHTML = '<i class="fas fa-music"></i>';
              }
          });
      
          // 页面任意位置点击时尝试播放
          document.addEventListener('click', function initAudio() {
              audio.play().then(() => {
                  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
              });
              document.removeEventListener('click', initAudio);
          }, { once: true });
      });
// Add scroll animation
const sections = document.querySelectorAll('.container');
const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.animation = `fadeIn 2s forwards`;
        observer.unobserve(entry.target);
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});
const container = document.getElementById('cai');
const button = document.getElementById('button1');
function movebutton() {
    const maxX = container.offsetWidth - button.offsetWidth;
    const maxY = container.offsetHeight - button.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}

setInterval(movebutton, 500);
       // 打开（或创建）IndexedDB 数据库
        const openDatabase = () => {
            const request = indexedDB.open('MessagesDB', 1);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('messages')) {
                    db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onerror = (e) => {
                console.error('数据库打开失败:', e);
            };

            return request;
        };

        // 获取当前时间，格式化为 'YYYY-MM-DD HH:MM:SS'
        const formatTime = (timestamp) => {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        // 获取所有留言
        const loadMessages = () => {
            const request = openDatabase();
            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction(['messages'], 'readonly');
                const store = transaction.objectStore('messages');
                const allMessages = store.getAll(); // 获取所有留言

                allMessages.onsuccess = () => {
                    const messages = allMessages.result;
                    const messagesDiv = document.getElementById('messages');
                    messagesDiv.innerHTML = ''; // 清空当前留言

                    messages.forEach((message) => {
                        const messageDiv = document.createElement('div');
                        messageDiv.classList.add('message');

                        // 显示留言内容
                        const messageText = document.createElement('p');
                        messageText.textContent = message.text;
                        messageDiv.appendChild(messageText);

                        // 显示留言时间
                        const messageTime = document.createElement('p');
                        messageTime.classList.add('message-time');
                        messageTime.textContent = `时间：${formatTime(message.timestamp)}`;
                        messageDiv.appendChild(messageTime);

                        messagesDiv.appendChild(messageDiv);
                    });
                };

                allMessages.onerror = (e) => {
                    console.error('获取留言失败:', e);
                };
            };
        };

        // 提交留言
        document.getElementById('submitBtn').addEventListener('click', () => {
            const messageText = document.getElementById('message').value.trim();
            if (messageText) {
                const timestamp = Date.now(); // 获取当前时间戳

                const request = openDatabase();
                request.onsuccess = (e) => {
                    const db = e.target.result;
                    const transaction = db.transaction(['messages'], 'readwrite');
                    const store = transaction.objectStore('messages');
                    const newMessage = { text: messageText, timestamp: timestamp };

                    store.add(newMessage); // 添加新的留言
                    transaction.oncomplete = () => {
                        console.log('留言提交成功');
                        document.getElementById('message').value = ''; // 清空留言框
                        loadMessages(); // 刷新留言列表
                    };

                    transaction.onerror = (e) => {
                        console.error('提交留言失败:', e);
                    };
                };
            } else {
                alert('留言不能为空！');
            }
        });

         // 清空所有留言
         document.getElementById('clearBtn').addEventListener('click', () => {
            // 显示密码验证弹出框
            document.getElementById('passwordModal').style.display = 'flex';
        });
        // 清空所有留言
        document.getElementById('verifyPasswordBtn').addEventListener('click', () => {
            const passwordInput = document.getElementById('passwordInput').value.trim();
            if (passwordInput === '0105') {
                const request = openDatabase();
                request.onsuccess = (e) => {
                    const db = e.target.result;
                    const transaction = db.transaction(['messages'], 'readwrite');
                    const store = transaction.objectStore('messages');

                    store.clear(); // 清空所有留言
                    transaction.oncomplete = () => {
                        console.log('所有留言已清空');
                        loadMessages(); // 刷新留言列表，显示为空
                        document.getElementById('passwordModal').style.display = 'none'; // 关闭弹出框
                    };

                    transaction.onerror = (e) => {
                        console.error('清空留言失败:', e);
                    };
                };
            } else {
                alert('密码错误！');
            }
        });
        document.getElementById('cancelPasswordBtn').addEventListener('click', () => {
            // 显示密码验证弹出框
            document.getElementById('passwordModal').style.display = 'none';
        });

        // 页面加载时显示所有留言
        window.onload = loadMessages;
