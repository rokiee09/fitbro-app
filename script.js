// FİTBRO Uygulaması - JavaScript

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';
let authToken = localStorage.getItem('authToken');
let currentUserData = null;

// API Functions
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { 'Authorization': `Bearer ${authToken}` })
    },
    ...options
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API hatası');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth Functions
async function registerUser(username, password, email) {
  return await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, email })
  });
}

async function loginUser(email, password) {
  return await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

async function getUserProfile() {
  return await apiRequest('/users/profile');
}

// DOM Elementleri
const authScreen = document.getElementById('authScreen');
const mainApp = document.getElementById('mainApp');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');
const currentUser = document.getElementById('currentUser');

// Spor ve Yemek Elementleri
const workoutList = document.getElementById('workoutList');
const completeWorkoutBtn = document.getElementById('completeWorkoutBtn');
const mealNameInput = document.getElementById('meal-name');
const mealCaloriesInput = document.getElementById('meal-calories');
const addMealBtn = document.getElementById('add-meal');
const mealList = document.getElementById('meal-list');
const totalCalories = document.getElementById('total-calories');

// Hamburger menü ve kullanıcı bilgisi
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const sidebarUsername = document.getElementById('sidebar-username');
const sidebarGenderIcon = document.getElementById('sidebar-gender-icon');

// Hamburger menü açma/kapama
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  if (sidebar.classList.contains('open')) {
    renderSidebarMainMenu();
  }
});

// Hamburger menü dışına veya hamburger simgesine tıklayınca kapanma
function handleSidebarClose(e) {
  // Sadece hamburger simgesine veya ana sayfadaki boş bir alana tıklanırsa menüyü kapat
  if (sidebar && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    sidebar.classList.remove('open');
  }
  // Hamburger simgesine tıklanırsa menüyü kapat (toggle zaten var)
}
document.removeEventListener('click', handleSidebarClose); // Önce varsa kaldır
setTimeout(() => {
  document.addEventListener('click', handleSidebarClose);
}, 100);

// Sidebar ana menü dinamik oluşturucu
function renderSidebarMainMenu() {
  sidebarContent.innerHTML = '';
  sidebarContent.style.display = 'none';
  // Eski ana menüyü kaldır
  const oldMenu = document.querySelector('.sidebar-main-menu');
  if (oldMenu) oldMenu.remove();
  // Ana menü HTML'ini oluştur
  const mainMenu = document.createElement('div');
  mainMenu.className = 'sidebar-main-menu';
  mainMenu.innerHTML = `
    <h3>⚙️ Ayarlar & Özellikler</h3>
          <div class="menu-grid">
        <div class="menu-item" data-panel="ai-planning"><span class="menu-icon">🧬</span><span class="menu-text">AI Planlama</span></div>
        <div class="menu-item" data-panel="muscle-selection"><span class="menu-icon">💪</span><span class="menu-text">Kas Grubu Seçimi</span></div>
        <div class="menu-item" data-panel="schedule"><span class="menu-icon">📅</span><span class="menu-text">Haftalık Program</span></div>
        <div class="menu-item" data-panel="maskot"><span class="menu-icon">🤖</span><span class="menu-text">Maskot & Mesaj</span></div>
        <div class="menu-item" data-panel="music"><span class="menu-icon">🎵</span><span class="menu-text">Müzik Modu</span></div>
        <div class="menu-item" data-panel="pdf-report"><span class="menu-icon">🧾</span><span class="menu-text">PDF Rapor</span></div>
        <div class="menu-item" data-panel="calendar"><span class="menu-icon">📅</span><span class="menu-text">Takvim Görünümü</span></div>
        <div class="menu-item" data-panel="statistics"><span class="menu-icon">📈</span><span class="menu-text">İstatistikler</span></div>
        <div class="menu-item" data-panel="reminders"><span class="menu-icon">🔔</span><span class="menu-text">Hatırlatıcılar</span></div>
        <div class="menu-item" data-panel="gamification"><span class="menu-icon">🎮</span><span class="menu-text">Oyunlaştırma</span></div>
        <div class="menu-item" data-panel="community"><span class="menu-icon">🧑‍🤝‍🧑</span><span class="menu-text">Topluluk</span></div>
        <div class="menu-item" data-panel="premium"><span class="menu-icon">💸</span><span class="menu-text">Premium</span></div>
        
        <!-- Yeni Kategoriler -->
        <div class="menu-item" data-panel="body-tracking"><span class="menu-icon">📏</span><span class="menu-text">Vücut Takibi</span></div>
        <div class="menu-item" data-panel="health-monitoring"><span class="menu-icon">🏥</span><span class="menu-text">Sağlık Takibi</span></div>
        <div class="menu-item" data-panel="goals"><span class="menu-icon">🎯</span><span class="menu-text">Hedefler</span></div>
        <div class="menu-item" data-panel="progress-photos"><span class="menu-icon">📸</span><span class="menu-text">İlerleme Fotoğrafları</span></div>
        <div class="menu-item" data-panel="leaderboard"><span class="menu-icon">🏆</span><span class="menu-text">Liderlik Tablosu</span></div>
        <div class="menu-item" data-panel="ai-analytics"><span class="menu-icon">🤖</span><span class="menu-text">AI Analiz</span></div>
        <div class="menu-item" data-panel="settings"><span class="menu-icon">⚙️</span><span class="menu-text">Ayarlar</span></div>
      </div>
  `;
  sidebar.appendChild(mainMenu);
  // Menü seçeneklerine event listener ekle
  mainMenu.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation(); // Tıklama olayının yukarıya yayılmasını engelle
      const panel = this.getAttribute('data-panel');
      mainMenu.remove(); // Ana menüyü kaldır
      showPanel(panel);
    });
  });
}

// Sidebar linkleri
const sidebarContent = document.getElementById('sidebar-content');

// Ana menü ve panel yönetimi
let currentPanel = 'main';

// Panel gösterme fonksiyonu güncellendi
function showPanel(panelName) {
  currentPanel = panelName;
  sidebarContent.innerHTML = '';
  sidebarContent.style.display = 'block';
  // Panel fonksiyonunu çağır
  switch(panelName) {
    case 'ai-planning':
      showAiPlanningPanel();
      break;
    case 'muscle-selection':
      showMuscleSelectionPanel();
      break;
    case 'schedule':
      showSchedulePanel();
      break;
    case 'maskot':
      showMaskotPanel();
      break;
    case 'music':
      showMusicPanel();
      break;
    case 'pdf-report':
      showPdfReportPanel();
      break;
    case 'calendar':
      showCalendarPanel();
      break;
    case 'statistics':
      showStatisticsPanel();
      break;
    case 'reminders':
      showRemindersPanel();
      break;
    case 'gamification':
      showGamificationPanel();
      break;
    case 'community':
      showCommunityPanel();
      break;
          case 'premium':
        showPremiumPanel();
        break;
      case 'body-tracking':
        showBodyTrackingPanel();
        break;
      case 'health-monitoring':
        showHealthMonitoringPanel();
        break;
      case 'goals':
        showGoalsPanel();
        break;
      case 'progress-photos':
        showProgressPhotosPanel();
        break;
      case 'leaderboard':
        showLeaderboardPanel();
        break;
      case 'ai-analytics':
        showAiAnalyticsPanel();
        break;
      case 'settings':
        showSettingsPanel();
        break;
  }
}

// Ana menü gösterme fonksiyonu güncellendi
function showMainMenu() {
  currentPanel = 'main';
  sidebarContent.innerHTML = '';
  sidebarContent.style.display = 'none';
  // Ana menü görünür olsun
  let mainMenu = document.querySelector('.sidebar-main-menu');
  if (!mainMenu) {
    sidebar.insertAdjacentHTML('beforeend', `
      <div class="sidebar-main-menu">
        <h3>⚙️ Ayarlar & Özellikler</h3>
        <div class="menu-grid">
          <div class="menu-item" onclick="showPanel('ai-planning')">
            <span class="menu-icon">🧬</span>
            <span class="menu-text">AI Planlama</span>
          </div>
          <div class="menu-item" onclick="showPanel('muscle-selection')">
            <span class="menu-icon">💪</span>
            <span class="menu-text">Kas Grubu Seçimi</span>
          </div>
          <div class="menu-item" onclick="showPanel('schedule')">
            <span class="menu-icon">📅</span>
            <span class="menu-text">Haftalık Program</span>
          </div>
          <div class="menu-item" onclick="showPanel('maskot')">
            <span class="menu-icon">🤖</span>
            <span class="menu-text">Maskot & Mesaj</span>
          </div>
          <div class="menu-item" onclick="showPanel('music')">
            <span class="menu-icon">🎵</span>
            <span class="menu-text">Müzik Modu</span>
          </div>
          <div class="menu-item" onclick="showPanel('pdf-report')">
            <span class="menu-icon">🧾</span>
            <span class="menu-text">PDF Rapor</span>
          </div>
          <div class="menu-item" onclick="showPanel('calendar')">
            <span class="menu-icon">📅</span>
            <span class="menu-text">Takvim Görünümü</span>
          </div>
          <div class="menu-item" onclick="showPanel('statistics')">
            <span class="menu-icon">📈</span>
            <span class="menu-text">İstatistikler</span>
          </div>
          <div class="menu-item" onclick="showPanel('reminders')">
            <span class="menu-icon">🔔</span>
            <span class="menu-text">Hatırlatıcılar</span>
          </div>
          <div class="menu-item" onclick="showPanel('gamification')">
            <span class="menu-icon">🎮</span>
            <span class="menu-text">Oyunlaştırma</span>
          </div>
          <div class="menu-item" onclick="showPanel('community')">
            <span class="menu-icon">🧑‍🤝‍🧑</span>
            <span class="menu-text">Topluluk</span>
          </div>
          <div class="menu-item" onclick="showPanel('premium')">
            <span class="menu-icon">💸</span>
            <span class="menu-text">Premium</span>
          </div>
        </div>
      </div>
    `);
    } else {
    mainMenu.classList.remove('hidden');
  }
}

// Geri butonu fonksiyonu güncellendi
function addBackButton() {
  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.innerHTML = '← Geri';
  // Event listener doğrudan burada:
  backButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Geri tuşuna tıklanınca menü kapanmasın
    sidebarContent.innerHTML = '';
    sidebarContent.style.display = 'none';
    renderSidebarMainMenu();
  });
  // Mevcut içeriğin başına geri tuşu ekle
  const currentContent = sidebarContent.innerHTML;
  sidebarContent.innerHTML = `
    <div class="panel-header">
      ${backButton.outerHTML}
    </div>
    <div class="panel-content">
      ${currentContent}
    </div>
  `;
  // Geri tuşunu tekrar DOM'dan bulup event listener ekle (çünkü innerHTML ile ekleniyor)
  const realBackButton = sidebarContent.querySelector('.back-button');
  if (realBackButton) {
    realBackButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Geri tuşuna tıklanınca menü kapanmasın
      sidebarContent.innerHTML = '';
      sidebarContent.style.display = 'none';
      renderSidebarMainMenu();
    });
  }
}

function showGoalPanel() {
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>🎯 Hedef Seçimi</h3>
      <div class="goal-selection">
        <label for="user-goal">Hedefin:</label>
        <select id="user-goal" class="goal-select">
          <option value="fit">Fit Kal</option>
          <option value="lose">Kilo Verme</option>
          <option value="gain">Kas Alma</option>
        </select>
        <div id="today-plan" class="today-plan-box"></div>
      </div>
    </div>
  `;
  addBackButton();
  
  // Hedef seçimi event listener'ı
  setTimeout(() => {
    const goalSelect = document.getElementById('user-goal');
    if (goalSelect) {
      goalSelect.addEventListener('change', function() {
        onUserGoalChange(this.value);
      });
      
      // Mevcut hedefi yükle
      const currentGoal = localStorage.getItem('userGoal') || 'fit';
      goalSelect.value = currentGoal;
      updateGoalSummary();
    }
  }, 100);
}

function showSchedulePanel() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const aiPlan = userData.aiPlan;
  
  // AI planı varsa onu kullan, yoksa varsayılan değerler
  const workoutDays = aiPlan ? aiPlan.haftalikSporGunu : 3;
  const workoutDuration = aiPlan ? aiPlan.sporSuresi : 45;
  const workoutType = aiPlan ? aiPlan.egzersizProgrami : 'Full body egzersiz';
  const dailyCalories = aiPlan ? aiPlan.gunlukKalori : 1800;
  const goal = aiPlan ? aiPlan.hedefText : 'Formda Kalma';
  
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>📅 Haftalık Program</h3>
      ${aiPlan ? `
        <div class="ai-plan-info">
          <div class="ai-plan-badge">🤖 AI Planından</div>
          <p><strong>Hedef:</strong> ${goal}</p>
          <p><strong>Haftalık Spor:</strong> ${workoutDays} gün, ${workoutDuration} dakika</p>
          <p><strong>Program:</strong> ${workoutType}</p>
          <p><strong>Günlük Kalori:</strong> ${dailyCalories} kcal</p>
        </div>
      ` : `
        <div class="no-ai-plan">
          <p>⚠️ AI planı oluşturulmamış. Önce AI planlamasından kişisel planınızı oluşturun.</p>
          <button onclick="showPanel('ai-planning')" class="ai-plan-btn">🧬 AI Planı Oluştur</button>
        </div>
      `}
      
      <div class="schedule-container">
        <div class="schedule-header">
          <h4>📋 Haftalık Program Detayları</h4>
          <button id="generate-schedule" class="generate-btn" ${!aiPlan ? 'disabled' : ''}>
            🔄 Program Oluştur
          </button>
        </div>
        
        <div id="weekly-schedule" class="weekly-schedule">
          ${aiPlan ? generateWeeklySchedule(aiPlan) : '<p>AI planı oluşturulduktan sonra program detayları burada görünecek.</p>'}
        </div>
        
        <div class="schedule-stats">
          <div class="stat-item">
            <span class="stat-icon">🔥</span>
            <span class="stat-value">${workoutDays}</span>
            <span class="stat-label">Spor Günü</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">⏱️</span>
            <span class="stat-value">${workoutDuration}dk</span>
            <span class="stat-label">Süre</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">🎯</span>
            <span class="stat-value">${dailyCalories}</span>
            <span class="stat-label">Kalori</span>
          </div>
        </div>
      </div>
    </div>
  `;
  addBackButton();
  
  // Event listener'ları ekle
  setTimeout(() => {
    const generateBtn = document.getElementById('generate-schedule');
    if (generateBtn && aiPlan) {
      generateBtn.addEventListener('click', () => {
        const newSchedule = generateWeeklySchedule(aiPlan);
        document.getElementById('weekly-schedule').innerHTML = newSchedule;
        showNotification('✅ Haftalık program yeniden oluşturuldu!');
      });
    }
  }, 100);
}

// AI planına göre haftalık program oluştur
function generateWeeklySchedule(aiPlan) {
  const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  const workoutDays = aiPlan.haftalikSporGunu;
  const workoutDuration = aiPlan.sporSuresi;
  
  // Spor günlerini belirle (AI planına göre)
  let selectedDays = [];
  if (aiPlan.goal === 'gain') {
    // Kas alma: Pazartesi, Çarşamba, Cuma, Cumartesi
    selectedDays = [0, 2, 4, 5];
  } else if (aiPlan.goal === 'lose') {
    // Yağ yakma: Pazartesi, Salı, Çarşamba, Perşembe, Cuma
    selectedDays = [0, 1, 2, 3, 4];
  } else {
    // Formda kalma: Pazartesi, Çarşamba, Cuma
    selectedDays = [0, 2, 4];
  }
  
  let scheduleHtml = '<div class="schedule-grid">';
  
  days.forEach((day, index) => {
    const isWorkoutDay = selectedDays.includes(index);
    const isToday = new Date().getDay() === (index + 1) % 7;
    
    scheduleHtml += `
      <div class="schedule-day ${isWorkoutDay ? 'workout-day' : 'rest-day'} ${isToday ? 'today' : ''}">
        <div class="day-header">
          <span class="day-name">${day}</span>
          ${isToday ? '<span class="today-badge">Bugün</span>' : ''}
        </div>
        <div class="day-content">
          ${isWorkoutDay ? `
            <div class="workout-info">
              <div class="workout-icon">💪</div>
              <div class="workout-details">
                <div class="workout-type">${getWorkoutTypeForDay(index, aiPlan)}</div>
                <div class="workout-duration">${workoutDuration} dakika</div>
              </div>
            </div>
          ` : `
            <div class="rest-info">
              <div class="rest-icon">😌</div>
              <div class="rest-text">Dinlenme</div>
            </div>
          `}
        </div>
      </div>
    `;
  });
  
  scheduleHtml += '</div>';
  return scheduleHtml;
}

// Gün için egzersiz türünü belirle
function getWorkoutTypeForDay(dayIndex, aiPlan) {
  if (aiPlan.goal === 'gain') {
    // Kas alma: Split program
    const splitTypes = ['Göğüs + Triceps', 'Sırt + Biceps', 'Bacak', 'Omuz + Karın'];
    return splitTypes[dayIndex % splitTypes.length];
  } else if (aiPlan.goal === 'lose') {
    // Yağ yakma: Kardiyo odaklı
    const cardioTypes = ['HIIT Kardiyo', 'Ağırlık', 'Koşu', 'Bisiklet', 'Yüzme'];
    return cardioTypes[dayIndex % cardioTypes.length];
  } else {
    // Formda kalma: Full body
    return 'Full Body';
  }
}

function showMaskotPanel() {
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>🤖 Maskot & Motivasyon</h3>
      <div class="maskot-container">
        <div id="maskot" class="maskot-display">🤖</div>
        <div id="maskot-message" class="maskot-message">Merhaba! Bugün nasılsın?</div>
        <button id="speak-btn" class="speak-btn">🗣️ Konuştur</button>
        <button id="motivate-btn" class="motivate-btn">💪 Motive Et</button>
      </div>
    </div>
  `;
  addBackButton();
  
  // Maskot event listener'ları
  setTimeout(() => {
    const speakBtn = document.getElementById('speak-btn');
    const motivateBtn = document.getElementById('motivate-btn');
    
    if (speakBtn) {
      speakBtn.addEventListener('click', function() {
        const message = document.getElementById('maskot-message').textContent;
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(message);
          utterance.lang = 'tr-TR';
          speechSynthesis.speak(utterance);
        }
      });
    }
    
    if (motivateBtn) {
      motivateBtn.addEventListener('click', function() {
        const motivations = [
          "Bugün harika bir gün! 💪",
          "Sen yapabilirsin! 🔥",
          "Her adım önemli! 🚀",
          "Güçlü ol! 💪",
          "Hedeflerine odaklan! 🎯"
        ];
        const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
        document.getElementById('maskot-message').textContent = randomMotivation;
      });
    }
  }, 100);
}

function showMusicPanel() {
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <div class="music-card">
        <h3 class="music-title">🎧 Spotify Müzik Modu</h3>
        
        <div class="music-mode-section">
          <label class="music-mode-label">Müzik Modu:</label>
          <select id="music-mode" class="music-mode-select">
            <option value="workout">💪 Egzersiz</option>
            <option value="relax">😌 Dinlenme</option>
            <option value="running">🏃‍♂️ Koşu</option>
            <option value="focus">🎯 Odaklanma</option>
            <option value="energy">⚡ Enerji</option>
            <option value="yoga">🧘‍♀️ Yoga</option>
          </select>
        </div>
        
        <div class="playlist-section">
          <h4 class="playlist-title">🎶 Önerilen Çalma Listeleri</h4>
          <div id="playlist-list" class="playlist-list">
            <div class="playlist-loading">🎵 Müzik yükleniyor...</div>
          </div>
        </div>
        
        <div class="playlist-buttons">
          <button id="add-playlist" class="playlist-btn playlist-btn-add">🎵 Ekle</button>
          <button id="edit-playlist" class="playlist-btn playlist-btn-edit">✏️ Düzenle</button>
          <button id="delete-playlist" class="playlist-btn playlist-btn-delete">🗑️ Sil</button>
        </div>
        
        <div class="spotify-player-section">
          <h4 class="player-title">🎵 Şimdi Çalıyor</h4>
          <div id="spotify-player" class="spotify-player">
            <div class="player-placeholder">
              <div class="player-icon">🎵</div>
              <p>Müzik çalmak için bir çalma listesi seçin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  addBackButton();
  
  // Müzik event listener'ları
  setTimeout(() => {
    const musicMode = document.getElementById('music-mode');
    if (musicMode) {
      musicMode.addEventListener('change', updateMusicPlaylists);
    }
    
    // Buton event listener'ları
    const addBtn = document.getElementById('add-playlist');
    const editBtn = document.getElementById('edit-playlist');
    const deleteBtn = document.getElementById('delete-playlist');
    
    if (addBtn) addBtn.addEventListener('click', addCustomPlaylist);
    if (editBtn) editBtn.addEventListener('click', editPlaylist);
    if (deleteBtn) deleteBtn.addEventListener('click', deletePlaylist);
    
    updateMusicPlaylists();
  }, 100);
}

// Müzik türlerine göre önerilen çalma listeleri - her tür için birden fazla seçenek
const musicRecommendations = {
  workout: [
    { name: "💪 Pump Up - Workout Mix", id: "37i9dQZF1DXdxcBWuJkbcy", description: "Yüksek enerjili egzersiz müzikleri" },
    { name: "🔥 Gym Motivation", id: "37i9dQZF1DX5Vy6DFOcx00", description: "Spor salonu motivasyon şarkıları" },
    { name: "⚡ Power Training", id: "37i9dQZF1DX8NTLI2TtZa6", description: "Güç antrenmanı için özel mix" },
    { name: "🏋️‍♂️ Strength & Cardio", id: "37i9dQZF1DX3Ogo9pFvBkY", description: "Güç ve kardiyo antrenmanı" },
    { name: "💪 Beast Mode", id: "37i9dQZF1DX4sWSpwq3LiO", description: "Vahşi mod antrenman müzikleri" }
  ],
  relax: [
    { name: "😌 Chill Vibes", id: "37i9dQZF1DX3Ogo9pFvBkY", description: "Rahatlatıcı ve sakin müzikler" },
    { name: "🌿 Nature Sounds", id: "37i9dQZF1DX4sWSpwq3LiO", description: "Doğa sesleri ve ambient" },
    { name: "🧘‍♀️ Meditation", id: "37i9dQZF1DX5Vy6DFOcx00", description: "Meditasyon ve mindfulness" },
    { name: "🌅 Sunset Relaxation", id: "37i9dQZF1DX8NTLI2TtZa6", description: "Gün batımı rahatlatıcı müzikler" },
    { name: "🌊 Ocean Waves", id: "37i9dQZF1DXdxcBWuJkbcy", description: "Okyanus dalgaları ve huzur" }
  ],
  running: [
    { name: "🏃‍♂️ Running Beats", id: "37i9dQZF1DX8NTLI2TtZa6", description: "Koşu için ritimli müzikler" },
    { name: "🎵 Cardio Mix", id: "37i9dQZF1DXdxcBWuJkbcy", description: "Kardiyo antrenmanı için" },
    { name: "⚡ Speed Training", id: "37i9dQZF1DX5Vy6DFOcx00", description: "Hız antrenmanı müzikleri" },
    { name: "🏃‍♀️ Marathon Training", id: "37i9dQZF1DX3Ogo9pFvBkY", description: "Maraton antrenmanı için" },
    { name: "🚀 Sprint Mode", id: "37i9dQZF1DX4sWSpwq3LiO", description: "Sprint antrenmanı müzikleri" }
  ],
  focus: [
    { name: "🎯 Focus Flow", id: "37i9dQZF1DX3Ogo9pFvBkY", description: "Odaklanma için özel mix" },
    { name: "📚 Study Music", id: "37i9dQZF1DX4sWSpwq3LiO", description: "Çalışma ve okuma müzikleri" },
    { name: "💼 Productivity", id: "37i9dQZF1DX8NTLI2TtZa6", description: "Verimlilik artırıcı müzikler" },
    { name: "🧠 Deep Focus", id: "37i9dQZF1DX5Vy6DFOcx00", description: "Derin odaklanma müzikleri" },
    { name: "⚡ Concentration Boost", id: "37i9dQZF1DXdxcBWuJkbcy", description: "Konsantrasyon artırıcı" }
  ],
  energy: [
    { name: "⚡ High Energy", id: "37i9dQZF1DXdxcBWuJkbcy", description: "Yüksek enerji veren şarkılar" },
    { name: "🔥 Fire Mix", id: "37i9dQZF1DX5Vy6DFOcx00", description: "Ateşli ve dinamik müzikler" },
    { name: "🚀 Boost Mode", id: "37i9dQZF1DX8NTLI2TtZa6", description: "Enerji seviyesini artıran mix" },
    { name: "💥 Explosive Energy", id: "37i9dQZF1DX3Ogo9pFvBkY", description: "Patlayıcı enerji müzikleri" },
    { name: "⚡ Lightning Fast", id: "37i9dQZF1DX4sWSpwq3LiO", description: "Şimşek hızında enerji" }
  ],
  yoga: [
    { name: "🧘‍♀️ Yoga Flow", id: "37i9dQZF1DX3Ogo9pFvBkY", description: "Yoga için özel müzikler" },
    { name: "🌺 Zen Garden", id: "37i9dQZF1DX4sWSpwq3LiO", description: "Zen ve huzur veren sesler" },
    { name: "🕉️ Spiritual Journey", id: "37i9dQZF1DX5Vy6DFOcx00", description: "Ruhani yolculuk müzikleri" },
    { name: "🌸 Mindful Practice", id: "37i9dQZF1DX8NTLI2TtZa6", description: "Farkındalık pratiği müzikleri" },
    { name: "🌿 Inner Peace", id: "37i9dQZF1DXdxcBWuJkbcy", description: "İç huzur ve sakinlik" }
  ]
};

// Rastgele öneri seçme fonksiyonu
function getRandomRecommendation(mode) {
  const recommendations = musicRecommendations[mode] || [];
  if (recommendations.length === 0) return null;
  
  // Kullanıcının son seçtiği öneriyi kaydet ve farklı bir öneri seç
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.lastMusicRecommendation) {
    userData.lastMusicRecommendation = {};
  }
  
  const lastRecommendation = userData.lastMusicRecommendation[mode];
  let availableRecommendations = recommendations;
  
  // Eğer birden fazla öneri varsa ve son seçilen öneri varsa, onu hariç tut
  if (recommendations.length > 1 && lastRecommendation) {
    availableRecommendations = recommendations.filter(rec => rec.id !== lastRecommendation);
  }
  
  // Rastgele öneri seç
  const randomIndex = Math.floor(Math.random() * availableRecommendations.length);
  const selectedRecommendation = availableRecommendations[randomIndex];
  
  // Son seçilen öneriyi kaydet
  userData.lastMusicRecommendation[mode] = selectedRecommendation.id;
  saveUserData(user.id, userData);
  
  return selectedRecommendation;
}

// Müzik çalma listelerini güncelle
function updateMusicPlaylists() {
  const musicMode = document.getElementById('music-mode');
  const playlistList = document.getElementById('playlist-list');
  
  if (!musicMode || !playlistList) return;
  
  const selectedMode = musicMode.value;
  const recommendation = getRandomRecommendation(selectedMode);
  
  // Kullanıcının özel çalma listelerini al
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const customPlaylists = userData.customPlaylists || [];
  
  playlistList.innerHTML = '';
  
  // Önerilen çalma listesi
  if (recommendation) {
    const recommendedSection = document.createElement('div');
    recommendedSection.className = 'playlist-section-group';
    recommendedSection.innerHTML = '<h5 class="section-title">🎵 Önerilen Çalma Listesi</h5>';
    
    const playlistElement = document.createElement('div');
    playlistElement.className = 'playlist-item featured-playlist';
    playlistElement.innerHTML = `
      <div class="playlist-info">
        <div class="playlist-name">${recommendation.name}</div>
        <div class="playlist-description">${recommendation.description}</div>
        <div class="playlist-badge">⭐ Önerilen</div>
      </div>
      <div class="playlist-actions">
        <button class="play-btn featured-play-btn" onclick="playSpotifyPlaylist('${recommendation.id}', '${recommendation.name}')">
          ▶️ Çal
        </button>
        <button class="preview-btn" onclick="previewPlaylist('${recommendation.id}')">
          👁️ Önizle
        </button>
        <button class="refresh-btn" onclick="refreshRecommendation()">
          🔄 Yenile
        </button>
      </div>
    `;
    recommendedSection.appendChild(playlistElement);
    playlistList.appendChild(recommendedSection);
  }
  
  // Özel çalma listeleri
  if (customPlaylists.length > 0) {
    const customSection = document.createElement('div');
    customSection.className = 'playlist-section-group';
    customSection.innerHTML = '<h5 class="section-title">⭐ Özel Çalma Listelerim</h5>';
    
    customPlaylists.forEach((playlist, index) => {
      const playlistElement = document.createElement('div');
      playlistElement.className = 'playlist-item custom-playlist-item';
      playlistElement.innerHTML = `
        <div class="playlist-info">
          <div class="playlist-name">${playlist.name}</div>
          <div class="playlist-description">Özel çalma listesi • ${new Date(playlist.addedAt).toLocaleDateString('tr-TR')}</div>
        </div>
        <div class="playlist-actions">
          <button class="play-btn" onclick="playSpotifyPlaylist('${playlist.id}', '${playlist.name}')">
            ▶️ Çal
          </button>
          <button class="preview-btn" onclick="previewPlaylist('${playlist.id}')">
            👁️ Önizle
          </button>
        </div>
      `;
      customSection.appendChild(playlistElement);
    });
    
    playlistList.appendChild(customSection);
  }
  
  // Hiç çalma listesi yoksa
  if (!recommendation && customPlaylists.length === 0) {
    playlistList.innerHTML = '<div class="no-playlists">Bu mod için henüz çalma listesi bulunmuyor. Kendi çalma listenizi ekleyebilirsiniz!</div>';
  }
}

// Öneriyi yenile
function refreshRecommendation() {
  updateMusicPlaylists();
}

// Spotify çalma listesini çal - Uygulama içinde
function playSpotifyPlaylist(playlistId, playlistName) {
  const playerContainer = document.getElementById('spotify-player');
  
  // Spotify Web Player'ı uygulama içinde başlat
  playerContainer.innerHTML = `
    <div class="spotify-embed">
      <div class="player-header">
        <h4>🎵 Şimdi Çalıyor: ${playlistName}</h4>
        <button class="close-player" onclick="closeSpotifyPlayer()">✕</button>
      </div>
      <iframe 
        src="https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator" 
        width="100%" 
        height="152" 
        frameborder="0" 
        allowfullscreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy">
      </iframe>
    </div>
  `;
  
  // Player'ı görünür yap
  playerContainer.style.display = 'block';
  playerContainer.scrollIntoView({ behavior: 'smooth' });
  
  showNotification(`🎵 ${playlistName} çalmaya başladı!`);
}

// Spotify player'ı kapat
function closeSpotifyPlayer() {
  const playerContainer = document.getElementById('spotify-player');
  playerContainer.innerHTML = `
    <div class="player-placeholder">
      <div class="player-icon">🎵</div>
      <p>Müzik çalmak için bir çalma listesi seçin</p>
    </div>
  `;
}

// Çalma listesi önizleme
function previewPlaylist(playlistId) {
  // Çalma listesinin ilk birkaç şarkısını göster
  const previewUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
  
  // Modal ile önizleme göster
  const modal = document.createElement('div');
  modal.className = 'playlist-preview-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>🎵 Çalma Listesi Önizleme</h3>
        <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">✕</button>
      </div>
      <div class="modal-body">
        <iframe 
          src="${previewUrl}" 
          width="100%" 
          height="300" 
          frameborder="0" 
          allowfullscreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy">
        </iframe>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// Özel çalma listesi ekleme
function addCustomPlaylist() {
  const playlistName = prompt('Çalma listesi adını girin:');
  if (!playlistName) return;
  
  const playlistUrl = prompt('Spotify çalma listesi URL\'sini girin:');
  if (!playlistUrl) return;
  
  // URL'den playlist ID'sini çıkar
  const playlistId = playlistUrl.match(/playlist\/([a-zA-Z0-9]+)/)?.[1];
  if (!playlistId) {
    alert('Geçersiz Spotify çalma listesi URL\'si!');
    return;
  }
  
  // Kullanıcının özel çalma listelerini kaydet
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.customPlaylists) {
    userData.customPlaylists = [];
  }
  
  userData.customPlaylists.push({
    name: playlistName,
    id: playlistId,
    url: playlistUrl,
    addedAt: new Date().toISOString()
  });
  
  saveUserData(user.id, userData);
  showNotification(`✅ ${playlistName} çalma listesi eklendi!`);
  
  // Çalma listelerini yenile
  updateMusicPlaylists();
}

// Çalma listesi düzenleme
function editPlaylist() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.customPlaylists || userData.customPlaylists.length === 0) {
    alert('Düzenlenecek özel çalma listeniz bulunmuyor!');
    return;
  }
  
  const playlistNames = userData.customPlaylists.map(p => p.name);
  const selectedName = prompt('Düzenlenecek çalma listesini seçin:\n' + playlistNames.join('\n'));
  
  if (!selectedName) return;
  
  const playlist = userData.customPlaylists.find(p => p.name === selectedName);
  if (!playlist) {
    alert('Çalma listesi bulunamadı!');
    return;
  }
  
  const newName = prompt('Yeni adı girin:', playlist.name);
  if (!newName) return;
  
  playlist.name = newName;
  saveUserData(user.id, userData);
  showNotification(`✅ ${selectedName} çalma listesi güncellendi!`);
  
  updateMusicPlaylists();
}

// Çalma listesi silme
function deletePlaylist() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.customPlaylists || userData.customPlaylists.length === 0) {
    alert('Silinecek özel çalma listeniz bulunmuyor!');
    return;
  }
  
  const playlistNames = userData.customPlaylists.map(p => p.name);
  const selectedName = prompt('Silinecek çalma listesini seçin:\n' + playlistNames.join('\n'));
  
  if (!selectedName) return;
  
  const confirmDelete = confirm(`${selectedName} çalma listesini silmek istediğinizden emin misiniz?`);
  if (!confirmDelete) return;
  
  userData.customPlaylists = userData.customPlaylists.filter(p => p.name !== selectedName);
  saveUserData(user.id, userData);
  showNotification(`🗑️ ${selectedName} çalma listesi silindi!`);
  
  updateMusicPlaylists();
}

function showPdfReportPanel() {
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>�� Haftalık PDF Raporu</h3>
      <div id="weekly-report-preview" style="margin-bottom:18px;"></div>
      <button id="download-pdf" class="generate-pdf-btn">📥 Raporu İndir</button>
    </div>
  `;
  addBackButton();

  // Haftalık rapor verisini hazırla ve önizlemede göster
  const previewDiv = document.getElementById('weekly-report-preview');
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const days = ['Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi','Pazar'];
  const today = new Date();
  const weekDates = [];
  // Haftanın başı (Pazartesi) bul
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDates.push(d);
  }
  let reportLines = [];
  for (let i = 0; i < 7; i++) {
    const d = weekDates[i];
    const dayName = days[i];
    const dateStr = d.toDateString();
    // Spor
    const workoutDone = userData.completedWorkouts?.[dateStr]?.length > 0;
    // Kalori
    const meals = userData.meals?.[dateStr] || [];
    const totalKcal = meals.reduce((sum, m) => sum + (m.calories||0), 0);
    let line = `${dayName}: Spor ${workoutDone ? '✅' : '❌'} | Kalori ${totalKcal}`;
    if (totalKcal > 2200) line += ' 🚨';
    reportLines.push(line);
  }
  previewDiv.innerHTML = `<pre style='font-size:1.1em;line-height:1.7;background:#f8f9fa;padding:12px;border-radius:8px;'>${reportLines.join('\n')}</pre>`;

  // PDF indir butonuna event listener ekle
  const pdfBtn = document.getElementById('download-pdf');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', function() {
      // jsPDF ile PDF oluştur
      let jsPDFConstructor = null;
      if (window.jspdf && window.jspdf.jsPDF) {
        jsPDFConstructor = window.jspdf.jsPDF;
      } else if (window.jsPDF) {
        jsPDFConstructor = window.jsPDF;
      }
      if (!jsPDFConstructor) {
        alert('PDF oluşturmak için jsPDF kütüphanesi yüklü olmalı!');
        return;
      }
      const doc = new jsPDFConstructor();
      doc.setFont('helvetica','bold');
      doc.setFontSize(18);
      doc.text('Haftalık Performans Raporu', 14, 18);
      doc.setFontSize(12);
      let y = 32;
      for (const line of reportLines) {
        doc.text(line, 14, y);
        y += 10;
      }
      doc.save('haftalik_rapor.pdf');
    });
  }
}

function showCalendarPanel() {
  // Takvimde günler ve özet için ayrı alanlar ekle
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>📅 Takvim Görünümü</h3>
      <div class="calendar-container">
        <div class="calendar-header">
          <button id="prev-month" class="nav-btn">←</button>
          <h4 id="month-year">Aralık 2024</h4>
          <button id="next-month" class="nav-btn">→</button>
        </div>
        <div id="calendar-grid" class="calendar-grid"></div>
        <div id="calendar-summary" style="margin:16px 0 0 0; text-align:center; font-size:1.05em; color:#333;"></div>
        <div class="calendar-legend">
          <div class="legend-item"><span class="legend-dot done"></span> Egzersiz Yapıldı</div>
          <div class="legend-item"><span class="legend-dot missed"></span> Egzersiz Yapılmadı</div>
          <div class="legend-item"><span class="legend-dot today"></span> Bugün</div>
        </div>
      </div>
    </div>
  `;
  addBackButton();

  // Takvim event listener'ları
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  if (prevBtn) prevBtn.addEventListener('click', () => navigateMonth(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateMonth(1));

  // Debug: calendar-grid var mı?
  const calendarGrid = document.getElementById('calendar-grid');
  console.log('calendar-grid bulundu mu?', !!calendarGrid);

  // Takvim gridini hemen yükle
  loadCalendar();
  console.log('loadCalendar çağrıldı.');
}

function navigateMonth(offset) {
  if (!window.calendarDate) window.calendarDate = new Date();
  const current = window.calendarDate;
  // Yeni ayı ayarla
  const newMonth = current.getMonth() + offset;
  window.calendarDate = new Date(current.getFullYear(), newMonth, 1);
  loadCalendar();
}

function showStatisticsPanel() {
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>📈 İstatistikler & Grafikler</h3>
      <div class="stats-container">
        <div class="stats-summary">
          <div class="stat-card">
            <span class="stat-icon">🔥</span>
            <span class="stat-value" id="weekly-exercise-days">0</span>
            <span class="stat-label">Haftalık Egzersiz</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">🍽️</span>
            <span class="stat-value" id="avg-calories">0</span>
            <span class="stat-label">Ortalama Kalori</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">⚖️</span>
            <span class="stat-value" id="weight-change">0</span>
            <span class="stat-label">Kilo Değişimi</span>
          </div>
        </div>
        
        <div class="charts-container">
          <div class="chart-section">
            <h4>📊 Günlük Kalori Takibi</h4>
            <canvas id="calorie-chart"></canvas>
          </div>
          <div class="chart-section">
            <h4>💪 Haftalık Egzersiz Günleri</h4>
            <canvas id="exercise-chart"></canvas>
          </div>
          <div class="chart-section">
            <h4>⚖️ Kilo Değişimi</h4>
            <canvas id="weight-chart"></canvas>
          </div>
        </div>
        
        <div class="weight-input">
          <input type="number" id="weight-input" placeholder="Kilonuzu girin (kg)" step="0.1">
          <button id="save-weight" class="save-weight-btn">💾 Kaydet</button>
        </div>
      </div>
    </div>
  `;
  addBackButton();
  
  // İstatistik event listener'ları
  setTimeout(() => {
    const saveWeightBtn = document.getElementById('save-weight');
    if (saveWeightBtn) {
      saveWeightBtn.addEventListener('click', function() {
        const weight = parseFloat(document.getElementById('weight-input').value);
        if (weight > 0) {
          saveWeight(weight);
          document.getElementById('weight-input').value = '';
        }
      });
    }
    
    loadCalorieChart();
    loadExerciseChart();
    loadWeightChart();
    updateStatisticsSummary();
  }, 100);
}

function showRemindersPanel() {
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>🔔 Hatırlatıcı Sistemi</h3>
      <div class="reminders-list" style="margin:18px 0 20px 0;">
        <div class="reminder-item" style="background:#f8f9fa;padding:14px 18px;border-radius:10px;margin-bottom:10px;display:flex;align-items:center;gap:10px;">
          <span style="font-size:1.3em;">⏰</span>
          <div>
            <b>10:00 Spor Zamanı</b><br>
            <span style="font-size:0.97em;color:#666;">Saat 10:00 olduğunda spor yapmayı hatırlatır.</span>
          </div>
        </div>
        <div class="reminder-item" style="background:#f8f9fa;padding:14px 18px;border-radius:10px;margin-bottom:10px;display:flex;align-items:center;gap:10px;">
          <span style="font-size:1.3em;">🍽️</span>
          <div>
            <b>Öğün Girmeyi Unutma</b><br>
            <span style="font-size:0.97em;color:#666;">Gün içinde hiç öğün girmezsen uyarı verir.</span>
          </div>
        </div>
      </div>
      <button id="test-notification" class="test-notification-btn">🔔 Test Bildirimi</button>
    </div>
  `;
  addBackButton();
  // Test bildirimi butonuna event listener ekle
  const testBtn = document.getElementById('test-notification');
  if (testBtn) {
    testBtn.addEventListener('click', function() {
      showNotification('Test bildirimi gönderildi!');
    });
  }
}

function showGamificationPanel() {
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>🎮 Oyunlaştırma</h3>
      <div class="gamification-overview">
        <div class="level-card">
          <div class="level-display">
            <span class="level-icon">⭐</span>
            <span class="level-number" id="sidebar-level">1</span>
          </div>
          <div class="xp-display">
            <div class="xp-bar-mini">
              <div class="xp-progress-mini" id="sidebar-xp-progress"></div>
            </div>
            <span class="xp-text-mini" id="sidebar-xp-text">0/100 XP</span>
          </div>
        </div>
        
        <div class="streak-card">
          <span class="streak-icon">🔥</span>
          <span class="streak-text">Üst Üste: <span id="sidebar-streak">0</span> gün</span>
        </div>
        
        <div class="badges-summary">
          <span class="badges-icon">🏅</span>
          <span class="badges-text">Rozetler: <span id="sidebar-badges">0</span>/${BADGES.length}</span>
        </div>
      </div>
      
      <button id="open-gamification" class="open-gamification-btn">🎮 Detaylı Görünüm</button>
    </div>
  `;
  addBackButton();
  
  // Event listener ekle
  setTimeout(() => {
    const openBtn = document.getElementById('open-gamification');
    if (openBtn) {
      openBtn.addEventListener('click', openGamificationModal);
    }
    
    // Verileri yükle
    loadGamificationData();
  }, 100);
}

function showAiPlanningPanel() {
  sidebarContent.innerHTML = `
    <div class="ai-panel-container">
      <div class="ai-panel-title">🧬 AI Planlama</div>
      <form id="ai-plan-form" class="ai-form">
        <div class="ai-form-row">
          <div class="ai-form-group">
            <label for="ai-weight">⚖️ Kilonuz (kg)</label>
            <input type="number" id="ai-weight" class="ai-input" required min="30" max="250" placeholder="Örn: 75">
          </div>
          <div class="ai-form-group">
            <label for="ai-height">📏 Boyunuz (cm)</label>
            <input type="number" id="ai-height" class="ai-input" required min="120" max="250" placeholder="Örn: 175">
          </div>
        </div>
        <div class="ai-form-row">
          <div class="ai-form-group">
            <label for="ai-age">🎂 Yaşınız</label>
            <input type="number" id="ai-age" class="ai-input" required min="10" max="100" placeholder="Örn: 25">
          </div>
          <div class="ai-form-group">
            <label for="ai-goal">🎯 Hedefiniz</label>
            <select id="ai-goal" class="ai-input" required>
              <option value="gain">Kas Alma</option>
              <option value="lose">Yağ Yakma</option>
              <option value="fit">Formda Kalma</option>
            </select>
          </div>
        </div>
        <div class="ai-form-row">
          <div class="ai-form-group">
            <label for="ai-activity">🏃‍♂️ Aktivite Seviyesi</label>
            <select id="ai-activity" class="ai-input" required>
              <option value="sedentary">Hareketsiz (Ofis işi)</option>
              <option value="light">Hafif Aktif (Haftada 1-3 gün spor)</option>
              <option value="moderate">Orta Aktif (Haftada 3-5 gün spor)</option>
              <option value="active">Çok Aktif (Haftada 6-7 gün spor)</option>
            </select>
          </div>
          <div class="ai-form-group">
            <label for="ai-experience">💪 Spor Deneyimi</label>
            <select id="ai-experience" class="ai-input" required>
              <option value="beginner">Yeni Başlayan</option>
              <option value="intermediate">Orta Seviye</option>
              <option value="advanced">İleri Seviye</option>
            </select>
          </div>
        </div>
        <button type="submit" class="ai-btn">🤖 AI Planı Oluştur</button>
      </form>
      <div id="ai-plan-result" class="ai-plan-result"></div>
    </div>
  `;
  addBackButton();

  // Form submit event
  const form = document.getElementById('ai-plan-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    const weight = parseInt(document.getElementById('ai-weight').value);
    const height = parseInt(document.getElementById('ai-height').value);
    const age = parseInt(document.getElementById('ai-age').value);
    const goal = document.getElementById('ai-goal').value;
    const activity = document.getElementById('ai-activity').value;
    const experience = document.getElementById('ai-experience').value;
    
    // AI Planı oluştur
    const aiPlan = createAiPlan(weight, height, age, goal, activity, experience);
    
    // Kullanıcı verilerine kaydet
    const user = getCurrentUser();
    const userData = getUserData(user.id);
    userData.aiPlan = aiPlan;
    userData.lastUpdated = new Date().toISOString();
    saveUserData(user.id, userData);
    
    // Plan özeti HTML'i
    const planHtml = `
      <div style="border:1px solid #888; border-radius:8px; padding:12px; background:#fff;">
        <b>AI Planı Özeti</b><br>
        Hedef: <b>${aiPlan.hedefText}</b><br>
        Yaş: <b>${age}</b> | Kilo: <b>${weight} kg</b> | Boy: <b>${height} cm</b><br>
        Günlük Kalori: <b>${aiPlan.gunlukKalori} kcal</b><br>
        Haftalık Spor: <b>${aiPlan.haftalikSporGunu} gün</b><br>
        Spor Süresi: <b>${aiPlan.sporSuresi} dakika</b><br>
        Aktivite Seviyesi: <b>${aiPlan.aktiviteSeviyesi}</b><br>
        Deneyim: <b>${aiPlan.deneyimSeviyesi}</b>
      </div>
    `;
    
    document.getElementById('ai-plan-result').innerHTML = `
      <div class="ai-success">
        <h4>✅ AI Planı Başarıyla Oluşturuldu!</h4>
        <p><b>Hedef:</b> ${aiPlan.hedefText}</p>
        <p><b>Günlük Kalori:</b> ${aiPlan.gunlukKalori} kcal</p>
        <p><b>Haftalık Spor:</b> ${aiPlan.haftalikSporGunu} gün, ${aiPlan.sporSuresi} dakika</p>
        <p><b>Egzersiz Programı:</b> ${aiPlan.egzersizProgrami}</p>
        <p><b>Müzik Önerisi:</b> ${aiPlan.muzikOnerisi}</p>
        <p><b>Beslenme Önerisi:</b> ${aiPlan.beslenmeOnerisi}</p>
        <div class="ai-note">
          💡 Bu plan diğer tüm özellikleri (haftalık program, müzik, hedefler) şekillendirecek!
        </div>
      </div>
    `;
    
    // Planı localStorage'a kaydet ve ana ekranda göster
    localStorage.setItem('aiPlanResultHtml', planHtml);
    updateMainAiPlanSummary();
    
    // Diğer panelleri güncelle
    updateAllPanelsFromAiPlan();
    
    showNotification('🎯 AI Planı oluşturuldu! Diğer özellikler bu plana göre güncellendi.');
  });
}

// AI Planı oluşturma fonksiyonu
function createAiPlan(weight, height, age, goal, activity, experience) {
  let gunlukKalori, haftalikSporGunu, sporSuresi, egzersizProgrami, muzikOnerisi, beslenmeOnerisi;
  let hedefText, aktiviteSeviyesi, deneyimSeviyesi;
  
  // Hedef belirleme
  switch(goal) {
    case 'gain':
      hedefText = 'Kas Alma';
      gunlukKalori = 2200 + (activity === 'active' ? 300 : 0);
      haftalikSporGunu = 4;
      sporSuresi = 60;
      egzersizProgrami = 'Split program (Göğüs, Sırt, Bacak, Omuz)';
      muzikOnerisi = 'workout';
      beslenmeOnerisi = 'Yüksek protein, orta karbonhidrat';
      break;
    case 'lose':
      hedefText = 'Yağ Yakma';
      gunlukKalori = 1600 - (activity === 'sedentary' ? 200 : 0);
      haftalikSporGunu = 5;
      sporSuresi = 45;
      egzersizProgrami = 'Kardiyo + HIIT + Ağırlık';
      muzikOnerisi = 'running';
      beslenmeOnerisi = 'Düşük kalori, yüksek protein';
      break;
    case 'fit':
    default:
      hedefText = 'Formda Kalma';
      gunlukKalori = 1800 + (activity === 'moderate' ? 200 : 0);
      haftalikSporGunu = 3;
      sporSuresi = 45;
      egzersizProgrami = 'Full body + Kardiyo';
      muzikOnerisi = 'energy';
      beslenmeOnerisi = 'Dengeli beslenme';
      break;
  }
  
  // Aktivite seviyesi
  switch(activity) {
    case 'sedentary': aktiviteSeviyesi = 'Hareketsiz'; break;
    case 'light': aktiviteSeviyesi = 'Hafif Aktif'; break;
    case 'moderate': aktiviteSeviyesi = 'Orta Aktif'; break;
    case 'active': aktiviteSeviyesi = 'Çok Aktif'; break;
  }
  
  // Deneyim seviyesi
  switch(experience) {
    case 'beginner': deneyimSeviyesi = 'Yeni Başlayan'; break;
    case 'intermediate': deneyimSeviyesi = 'Orta Seviye'; break;
    case 'advanced': deneyimSeviyesi = 'İleri Seviye'; break;
  }
  
  return {
    weight, height, age, goal, activity, experience,
    hedefText, gunlukKalori, haftalikSporGunu, sporSuresi,
    egzersizProgrami, muzikOnerisi, beslenmeOnerisi,
    aktiviteSeviyesi, deneyimSeviyesi,
    createdAt: new Date().toISOString()
  };
}

// AI Planından diğer panelleri güncelle
function updateAllPanelsFromAiPlan() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const aiPlan = userData.aiPlan;
  
  if (!aiPlan) return;
  
  // Müzik panelini güncelle
  updateMusicPanelFromAiPlan(aiPlan);
  
  // Haftalık program panelini güncelle
  updateSchedulePanelFromAiPlan(aiPlan);
  
  // Ana ekran hedeflerini güncelle
  updateMainScreenFromAiPlan(aiPlan);
  
  // İstatistikleri güncelle
  updateStatisticsFromAiPlan(aiPlan);
}

// Müzik panelini AI planına göre güncelle
function updateMusicPanelFromAiPlan(aiPlan) {
  // Müzik modunu AI planına göre ayarla
  if (aiPlan.muzikOnerisi) {
    const musicModeSelect = document.getElementById('music-mode');
    if (musicModeSelect) {
      musicModeSelect.value = aiPlan.muzikOnerisi;
      updateMusicPlaylists();
    }
  }
}

// Haftalık program panelini AI planına göre güncelle
function updateSchedulePanelFromAiPlan(aiPlan) {
  // Haftalık program verilerini AI planına göre güncelle
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  userData.weeklySchedule = {
    workoutDays: aiPlan.haftalikSporGunu,
    workoutDuration: aiPlan.sporSuresi,
    workoutType: aiPlan.egzersizProgrami,
    dailyCalories: aiPlan.gunlukKalori,
    goal: aiPlan.hedefText,
    lastUpdated: new Date().toISOString()
  };
  
  saveUserData(user.id, userData);
}

// Ana ekranı AI planına göre güncelle
function updateMainScreenFromAiPlan(aiPlan) {
  // Günlük kalori hedefini güncelle
  const calorieSuggestion = document.getElementById('calorie-suggestion');
  if (calorieSuggestion) {
    calorieSuggestion.textContent = `Günlük Hedef: ${aiPlan.gunlukKalori} kcal`;
  }
  
  // Spor hedefini güncelle
  const workoutGoal = document.getElementById('workout-goal');
  if (workoutGoal) {
    workoutGoal.textContent = `Haftalık Hedef: ${aiPlan.haftalikSporGunu} gün spor`;
  }
}

// İstatistikleri AI planına göre güncelle
function updateStatisticsFromAiPlan(aiPlan) {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  // Hedef verilerini güncelle
  userData.goals = {
    dailyCalories: aiPlan.gunlukKalori,
    weeklyWorkouts: aiPlan.haftalikSporGunu,
    workoutDuration: aiPlan.sporSuresi,
    targetWeight: aiPlan.goal === 'lose' ? aiPlan.weight - 5 : aiPlan.goal === 'gain' ? aiPlan.weight + 5 : aiPlan.weight,
    goal: aiPlan.hedefText
  };
  
  saveUserData(user.id, userData);
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const gender = document.querySelector('input[name="loginGender"]:checked').value;

  if (!email || !password) {
    showNotification('⚠️ Email ve şifre gerekli!');
    return;
  }

  try {
    showNotification('🔄 Giriş yapılıyor...');
    
    const response = await loginUser(email, password);
    
    // Token'ı kaydet
    authToken = response.token;
    localStorage.setItem('authToken', authToken);
    
    // Kullanıcı bilgilerini kaydet
    currentUserData = response.user;
    const user = { 
      id: response.user.id, 
      username: response.user.username, 
      gender: gender,
      email: response.user.email,
      isPremium: response.user.isPremium
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Kullanıcı verilerini başlat
    if (!getUserData(user.id)) {
      const initialData = {
        level: 1,
        streak: 0,
        xp: 0,
        badges: [],
        meals: {},
        completedWorkouts: {},
        weightHistory: [],
        isPro: response.user.isPremium
      };
      saveUserData(user.id, initialData);
    }
    
    showMainApp(user);
    showNotification('✅ Giriş başarılı! Hoş geldin ' + user.username + '!');
    
    // Yemek listesini ve kaloriyi yükle
    loadMeals();
    updateTotalCalories();
    
    // Hatırlatıcıları başlat
    startReminders();
    
  } catch (error) {
    showNotification('❌ Giriş hatası: ' + error.message);
  }
}

// Kayıt fonksiyonu
async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('registerUsername').value.trim();
  const password = document.getElementById('registerPassword').value;
  const gender = document.querySelector('input[name="registerGender"]:checked').value;
  const email = username + '@fitbro.com'; // Geçici email oluştur

  if (!username || !password) {
    showNotification('⚠️ Kullanıcı adı ve şifre gerekli!');
    return;
  }

  try {
    showNotification('🔄 Kayıt yapılıyor...');
    
    const response = await registerUser(username, password, email);
    
    // Token'ı kaydet
    authToken = response.token;
    localStorage.setItem('authToken', authToken);
    
    // Kullanıcı bilgilerini kaydet
    currentUserData = response.user;
    const user = { 
      id: response.user.id, 
      username: response.user.username, 
      gender: gender,
      email: response.user.email,
      isPremium: response.user.isPremium
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Kullanıcı verilerini başlat
    if (!getUserData(user.id)) {
      const initialData = {
        level: 1,
        streak: 0,
        xp: 0,
        badges: [],
        meals: {},
        completedWorkouts: {},
        weightHistory: [],
        isPro: response.user.isPremium
      };
      saveUserData(user.id, initialData);
    }
    
    showMainApp(user);
    showNotification('✅ Kayıt başarılı! Hoş geldin ' + user.username + '!');
    
    // Yemek listesini ve kaloriyi yükle
    loadMeals();
    updateTotalCalories();
    
    // Hatırlatıcıları başlat
    startReminders();
    
  } catch (error) {
    showNotification('❌ Kayıt hatası: ' + error.message);
  }
}

// Eski sidebar menü id'lerine erişen ve addEventListener ekleyen kodlar tamamen kaldırıldı.
// Sadece dinamik menü ve login formu ile ilgili kodlar kaldı.

// Form event listeners
if (loginForm) {
  loginForm.addEventListener('submit', handleLogin);
}

if (registerForm) {
  registerForm.addEventListener('submit', handleRegister);
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', handleLogout);
}

function handleLogout() {
  // Token ve kullanıcı verilerini temizle
  localStorage.removeItem('currentUser');
  localStorage.removeItem('authToken');
  authToken = null;
  currentUserData = null;
  
  authScreen.classList.remove('hidden');
  mainApp.classList.add('hidden');
  
  showNotification('👋 Çıkış yapıldı!');
}

// Sayfa yüklendiğinde ana menüyü göster
document.addEventListener('DOMContentLoaded', function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (currentUser) {
    authScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
    sidebarUsername.textContent = currentUser.username;
    sidebarGenderIcon.textContent = currentUser.gender === 'male' ? '👨' : '👩';
  } else {
    authScreen.classList.remove('hidden');
    mainApp.classList.add('hidden');
  }
  showMainMenu();
});

function loadCalendar() {
  const user = getCurrentUser();
  let userData = getUserData(user.id);
  const calendarGrid = document.getElementById('calendar-grid');
  const summaryDiv = document.getElementById('calendar-summary');
  if (!calendarGrid) return;

  // Test/fallback: Eğer userData veya completedWorkouts yoksa örnek veriyle doldur
  if (!userData || !userData.completedWorkouts) {
    userData = { completedWorkouts: {} };
    // Örnek: Ayın 2, 5, 8, 12, 15, 20, 25. günlerinde spor yapılmış gibi göster
    if (window.calendarDate) {
      const year = window.calendarDate.getFullYear();
      const month = window.calendarDate.getMonth();
      [2,5,8,12,15,20,25].forEach(d => {
        const dateObj = new Date(year, month, d);
        userData.completedWorkouts[dateObj.toDateString()] = ['Egzersiz'];
      });
    }
  }

  // Grid'i temizle ve görünür yap
  calendarGrid.innerHTML = '';
  calendarGrid.style.display = 'grid';
  calendarGrid.style.minHeight = '350px';

  // Ay ve yıl
  if (!window.calendarDate) window.calendarDate = new Date();
  const now = window.calendarDate;
  const year = now.getFullYear();
  const month = now.getMonth();

  // Ay başı ve kaç gün var
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekDay = (firstDay.getDay() + 6) % 7; // Pazartesi=0

  // Ay/yıl başlığı
  const monthNames = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  const dayShorts = ['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'];
  const monthYear = document.getElementById('month-year');
  if (monthYear) monthYear.textContent = `${monthNames[month]} ${year}`;

  // Gün isimleri başlık satırı
  for (let i = 0; i < 7; i++) {
    const dayName = document.createElement('div');
    dayName.className = 'calendar-day calendar-header-day';
    dayName.style.background = '#f0f0f0';
    dayName.style.fontWeight = 'bold';
    dayName.style.fontSize = '1.1em';
    dayName.style.border = 'none';
    dayName.textContent = dayShorts[i];
    calendarGrid.appendChild(dayName);
  }

  // Boş kutular (ayın ilk günü öncesi)
  for (let i = 0; i < startWeekDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-day other-month';
    calendarGrid.appendChild(empty);
  }

  // Günler
  let doneCount = 0, missedCount = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = dateObj.toDateString();
    const isToday = (new Date().toDateString() === dateStr);
    const workoutDone = userData.completedWorkouts?.[dateStr]?.length > 0;
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    dayDiv.style.fontSize = '1.2em';
    dayDiv.style.height = '54px';
    dayDiv.style.minHeight = '54px';
    dayDiv.style.display = 'flex';
    dayDiv.style.flexDirection = 'column';
    dayDiv.style.justifyContent = 'center';
    dayDiv.style.alignItems = 'center';
    dayDiv.style.margin = '2px';
    dayDiv.style.borderRadius = '10px';
    if (isToday) {
      dayDiv.classList.add('today');
      dayDiv.style.border = '3px solid #2196F3';
      dayDiv.style.boxShadow = '0 0 0 2px #2196F333';
    }
    if (workoutDone) {
      doneCount++;
      dayDiv.classList.add('done');
      dayDiv.style.background = '#e8f5e8';
      dayDiv.style.color = '#2e7d32';
      dayDiv.innerHTML = `<span class='day-number' style='font-size:1.1em;font-weight:700;'>${d}</span><span class='exercise-indicator' style='font-size:1.5em;'>✅</span>`;
    } else {
      missedCount++;
      dayDiv.classList.add('missed');
      dayDiv.style.background = '#ffebee';
      dayDiv.style.color = '#c62828';
      dayDiv.innerHTML = `<span class='day-number' style='font-size:1.1em;font-weight:700;'>${d}</span><span class='exercise-indicator' style='font-size:1.5em;'>❌</span>`;
    }
    calendarGrid.appendChild(dayDiv);
  }

  // Sonra kalan kutular (ayın sonu sonrası)
  for (let i = startWeekDay + daysInMonth; (i) % 7 !== 0; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-day other-month';
    calendarGrid.appendChild(empty);
  }

  // Alt özet
  if (summaryDiv) {
    summaryDiv.innerHTML = `<span style='color:#2e7d32;font-weight:600;'>${doneCount} gün spor yapıldı</span> &nbsp;|&nbsp; <span style='color:#c62828;font-weight:600;'>${missedCount} gün yapılmadı</span>`;
  }
}

function getCurrentUser() {
    return { id: "1", username: "admin", gender: "male" };
}

function getUserData(userId) {
    const data = localStorage.getItem('fitbro_userdata_' + userId);
    return data ? JSON.parse(data) : {};
}

function saveUserData(userId, data) {
    localStorage.setItem('fitbro_userdata_' + userId, JSON.stringify(data));
}

function addMeal() {
    const mealName = document.getElementById('meal-name').value.trim();
    const mealCalories = parseInt(document.getElementById('meal-calories').value);
    const mealType = document.getElementById('meal-type').value || 'snack';

    if (!mealName || !mealCalories || mealCalories <= 0) {
        alert('Geçerli yemek adı ve kalori girin!');
        return;
    }

    const user = getCurrentUser();
    if (!user) {
        alert('Kullanıcı oturumu bulunamadı!');
        return;
    }
    let userData = getUserData(user.id);
    if (!userData) {
        alert('Kullanıcı verisi bulunamadı!');
        return;
    }
    if (!userData.meals) userData.meals = {};
    const today = new Date().toDateString();
    if (!userData.meals[today]) userData.meals[today] = [];

    const newMeal = {
        name: mealName,
        calories: mealCalories,
        type: mealType,
        time: new Date().toLocaleTimeString()
    };

    userData.meals[today].push(newMeal);
    saveUserData(user.id, userData);

    // Gamification ve XP işlemleri
    addXP(userData, 10);
    checkLevelUp(userData);
    saveUserData(user.id, userData);
    gamificationTrigger();

    // Ekranda göster
    loadMeals();
    updateTotalCalories();
}

function showTotalCalories() {
    const user = getCurrentUser();
    const userData = getUserData(user.id);
    const today = new Date().toDateString();
    const meals = userData.meals?.[today] || [];
    const total = meals.reduce((sum, m) => sum + (parseInt(m.calories) || 0), 0);
    document.getElementById('total-calories').textContent = total;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-meal').onclick = addMeal;
    showTotalCalories();
});

function loadCalorieChart() {
  const ctx = document.getElementById('calorie-chart').getContext('2d');
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  // Son 7 gün
  const days = [];
  const calories = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' });
    days.push(dateStr);
    const key = date.toDateString();
    const dayMeals = userData.meals?.[key] || [];
    calories.push(dayMeals.reduce((sum, m) => sum + m.calories, 0));
  }
  if (window.calorieChartObj) window.calorieChartObj.destroy();
  window.calorieChartObj = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [{
        label: 'Toplam Kalori',
        data: calories,
        borderColor: '#43a047',
        backgroundColor: 'rgba(67,160,71,0.12)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#43a047',
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { color: '#43a047' } },
        x: { ticks: { color: '#333' } }
      }
    }
  });
}

function loadExerciseChart() {
  const ctx = document.getElementById('exercise-chart').getContext('2d');
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  // Son 7 gün
  const days = [];
  const workouts = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' });
    days.push(dateStr);
    const key = date.toDateString();
    workouts.push(userData.completedWorkouts?.[key]?.length > 0 ? 1 : 0);
  }
  if (window.exerciseChartObj) window.exerciseChartObj.destroy();
  window.exerciseChartObj = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        label: 'Spor Yapıldı',
        data: workouts,
        backgroundColor: workouts.map(v => v ? '#1976d2' : '#e57373'),
        borderRadius: 8,
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: 1, ticks: { stepSize: 1, color: '#1976d2' } },
        x: { ticks: { color: '#333' } }
      }
    }
  });
}

function loadWeightChart() {
  const ctx = document.getElementById('weight-chart').getContext('2d');
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  // Son 14 gün
  const days = [];
  const weights = [];
  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
    days.push(dateStr);
    const key = date.toDateString();
    weights.push(userData.weights?.[key] || null);
  }
  if (window.weightChartObj) window.weightChartObj.destroy();
  window.weightChartObj = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [{
        label: 'Kilo (kg)',
        data: weights,
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255,152,0,0.10)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#ff9800',
        spanGaps: true
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: false, ticks: { color: '#ff9800' } },
        x: { ticks: { color: '#333' } }
      }
    }
  });
}

// Basit Hatırlatıcı Sistemi
function startReminders() {
  setInterval(() => {
    const user = getCurrentUser();
    if (!user) return;
    const userData = getUserData(user.id);
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const todayKey = now.toDateString();

    // Saat 10:00'da spor zamanı bildirimi
    if (hour === 10 && minute === 0 && !window._reminder10) {
      showNotification('Spor zamanı! 💪 Saat 10:00 oldu, egzersizini unutma!');
      window._reminder10 = true;
      setTimeout(() => { window._reminder10 = false; }, 60000); // 1 dk sonra tekrar tetiklenebilir
    }

    // Gün içinde hiç öğün girilmediyse uyarı (sadece 12:00-20:00 arası)
    const nowHour = now.getHours();
    if (nowHour >= 12 && nowHour <= 20 && (!userData.meals || !userData.meals[todayKey] || userData.meals[todayKey].length === 0) && !window._reminderMeal) {
      showNotification('Bugün hiçbir öğün girmedin! 🍽️ Sağlıklı beslenmeyi unutma.');
      window._reminderMeal = true;
      setTimeout(() => { window._reminderMeal = false; }, 3600000); // 1 saat sonra tekrar tetiklenebilir
    }
  }, 60000); // Her 1 dakikada bir kontrol
}

// Basit bildirim kutusu
function showNotification(msg) {
  let notif = document.createElement('div');
  notif.className = 'notification';
  notif.innerHTML = `<span>${msg}</span>`;
  notif.style.position = 'fixed';
  notif.style.bottom = '32px';
  notif.style.right = '32px';
  notif.style.background = '#fff';
  notif.style.color = '#333';
  notif.style.padding = '18px 28px';
  notif.style.borderRadius = '12px';
  notif.style.boxShadow = '0 4px 16px rgba(67,160,71,0.13)';
  notif.style.fontSize = '1.08em';
  notif.style.zIndex = 9999;
  notif.style.opacity = 0;
  notif.style.transition = 'opacity 0.4s';
  document.body.appendChild(notif);
  setTimeout(() => { notif.style.opacity = 1; }, 100);
  setTimeout(() => { notif.style.opacity = 0; notif.remove(); }, 5000);
}

// Sayfa yüklendiğinde hatırlatıcıyı başlat
window.addEventListener('DOMContentLoaded', startReminders);

// --- Gamification: Seviye ve Rozetler ---
const BADGES = [
  { id: 'no_sugar_week', icon: '💦', name: '1 Hafta Şeker Yok!', desc: '7 gün boyunca şekerli/tatlı yemek yeme.' },
  { id: 'full_meal_week', icon: '🥗', name: 'Haftalık Yemek Girişleri Eksiksiz!', desc: '7 gün boyunca her gün en az 1 öğün gir.' }
];

function getStreak(userData) {
  let streak = 0;
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toDateString();
    if (userData.completedWorkouts?.[key]?.length > 0) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function getLevel(streak) {
  if (streak >= 30) return 4;
  if (streak >= 20) return 3;
  if (streak >= 10) return 2;
  return 1;
}

function checkBadges(userData) {
  const badges = userData.badges || [];
  // 1 Hafta Şeker Yok Rozeti
  let noSugar = true;
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toDateString();
    const meals = userData.meals?.[key] || [];
    if (meals.some(m => /şeker|tatlı|çikolata|bisküvi|pasta|kek|dondurma/i.test(m.name))) {
      noSugar = false;
      break;
    }
  }
  if (noSugar && !badges.includes('no_sugar_week')) {
    badges.push('no_sugar_week');
    showNotification('💦 Tebrikler! 1 Hafta Şeker Yok rozeti kazandın!');
  }
  // Haftalık Yemek Girişleri Eksiksiz Rozeti
  let fullMeal = true;
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toDateString();
    const meals = userData.meals?.[key] || [];
    if (meals.length === 0) {
      fullMeal = false;
      break;
    }
  }
  if (fullMeal && !badges.includes('full_meal_week')) {
    badges.push('full_meal_week');
    showNotification('🥗 Tebrikler! Haftalık Yemek Girişleri Eksiksiz rozeti kazandın!');
  }
  userData.badges = badges;
}

function updateGamification() {
    const user = getCurrentUser();
  if (!user) return;
    const userData = getUserData(user.id);
  // Streak ve Level
  const streak = getStreak(userData);
  const level = getLevel(streak);
  userData.level = level;
  userData.streak = streak;
  // Rozetler
  checkBadges(userData);
  saveUserData(user.id, userData);
}

// Spor veya yemek eklenince çağır
function gamificationTrigger() {
  updateGamification();
  // Panel açıksa güncelle
  if (document.getElementById('sidebar-level')) {
    loadGamificationData();
  }
}

// Gamification panelini doldur
function loadGamificationData() {
  const user = getCurrentUser();
  if (!user) return;
  const userData = getUserData(user.id);
  // Seviye ve streak
  document.getElementById('sidebar-level').textContent = userData.level || 1;
  document.getElementById('sidebar-streak').textContent = userData.streak || 0;
  // XP barı
  const xpBarMini = document.getElementById('sidebar-xp-progress');
  if (xpBarMini) {
    const xp = getXP(userData);
    const nextLevelXP = getXPForLevel(userData.level + 1);
    xpBarMini.style.width = `${(xp / nextLevelXP) * 100}%`;
    document.getElementById('sidebar-xp-text').textContent = `${xp}/${nextLevelXP} XP`;
  }
  // Rozetler
  document.getElementById('sidebar-badges').textContent = (userData.badges?.length || 0);
  // Detaylı panelde rozetler
  if (document.getElementById('badges-grid')) {
    const grid = document.getElementById('badges-grid');
    grid.innerHTML = '';
    BADGES.forEach(badge => {
      const unlocked = userData.badges?.includes(badge.id);
      grid.innerHTML += `<div class="badge-item${unlocked ? ' unlocked' : ' locked'}">
        <span class="badge-icon">${badge.icon}</span>
        <div class="badge-info">
          <div class="badge-name">${badge.name}</div>
          <div class="badge-description">${badge.desc}</div>
          <div class="badge-status">${unlocked ? 'Açık' : 'Kilitli'}</div>
        </div>
      </div>`;
    });
  }
}

// --- XP, Görevler ve Konfeti ---
const DAILY_TASKS = [
  { id: 'exercise2', icon: '⭐', text: 'Bugün 2 farklı egzersiz yap', check: (u) => getTodayWorkoutCount(u) >= 2 },
  { id: 'meal3', icon: '🍽️', text: 'Bugün 3 öğün gir', check: (u) => getTodayMealCount(u) >= 3 },
  { id: 'water', icon: '💧', text: '1.5 litre su iç (elle işaretle)', check: (u) => !!getTodayTaskDone('water') }
];

function getTodayWorkoutCount(userData) {
  const today = new Date().toDateString();
  return userData.completedWorkouts?.[today]?.length || 0;
}
function getTodayMealCount(userData) {
  const today = new Date().toDateString();
  return userData.meals?.[today]?.length || 0;
}
function getTodayTaskDone(task) {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const today = new Date().toDateString();
  return userData.tasks?.[today]?.includes(task);
}
function setTodayTaskDone(task) {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const today = new Date().toDateString();
  if (!userData.tasks) userData.tasks = {};
  if (!userData.tasks[today]) userData.tasks[today] = [];
  if (!userData.tasks[today].includes(task)) userData.tasks[today].push(task);
        saveUserData(user.id, userData);
  gamificationTrigger();
}

function getXP(userData) {
  return userData.xp || 0;
}
function addXP(userData, amount) {
  userData.xp = (userData.xp || 0) + amount;
}
function getXPForLevel(level) {
  return 100 * level;
}
function checkLevelUp(userData) {
  let level = userData.level || 1;
  let xp = userData.xp || 0;
  let nextXP = getXPForLevel(level);
  let leveledUp = false;
  while (xp >= nextXP) {
    xp -= nextXP;
    level++;
    nextXP = getXPForLevel(level);
    leveledUp = true;
  }
  userData.level = level;
  userData.xp = xp;
  if (leveledUp) {
    showNotification('⭐ Seviye atladın! Yeni seviye: ' + level);
    showConfetti();
  }
}
function showConfetti() {
  const confetti = document.createElement('canvas');
  confetti.className = 'confetti';
  document.body.appendChild(confetti);
  const ctx = confetti.getContext('2d');
  confetti.width = window.innerWidth;
  confetti.height = window.innerHeight;
  const pieces = Array.from({length: 120}, () => ({
    x: Math.random() * confetti.width,
    y: Math.random() * -confetti.height,
    r: 6 + Math.random() * 8,
    d: Math.random() * 360,
    color: `hsl(${Math.random()*360},90%,60%)`,
    tilt: Math.random()*10-5
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0,0,confetti.width,confetti.height);
    pieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2*Math.PI);
      ctx.fillStyle = p.color;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.tilt);
      ctx.translate(-p.x, -p.y);
      ctx.fill();
      ctx.restore();
      p.y += 2 + Math.random()*2;
      p.x += Math.sin((frame+p.d)/20)*2;
      p.tilt += Math.random()*0.1-0.05;
      if (p.y > confetti.height) p.y = -10;
    });
    frame++;
    if (frame < 120) requestAnimationFrame(draw);
    else setTimeout(()=>confetti.remove(), 800);
  }
  draw();
}

// Görevler paneli
function showTasksPanel() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  let html = '<div class="tasks-panel"><h4 style="margin-bottom:10px;font-family:Montserrat;font-size:1.15em;">Günlük Görevler</h4>';
  DAILY_TASKS.forEach(task => {
    const completed = task.check(userData);
    html += `<div class="task-item${completed ? ' completed' : ''}">
      <span class="task-icon">${task.icon}</span>
      <span>${task.text}</span>
      ${task.id==='water'&&!completed?`<button onclick="setTodayTaskDone('water')" style="margin-left:auto;padding:4px 10px;border-radius:8px;background:#43a047;color:#fff;border:none;">İçtim</button>`:''}
      ${completed?'<span class="task-check">✔️</span>':''}
    </div>`;
  });
  html += '</div>';
  return html;
}

// Gamification paneline görevler panelini ekle
const _oldShowGamificationPanel = showGamificationPanel;
showGamificationPanel = function() {
  _oldShowGamificationPanel.apply(this, arguments);
  const panel = document.querySelector('.panel-container');
  if (panel) {
    panel.insertAdjacentHTML('beforeend', showTasksPanel());
  }
};

// Pro kontrol fonksiyonu
function isProUser() {
  const user = getCurrentUser();
  if (!user) return false;
  const userData = getUserData(user.id);
  return !!userData.isPro;
}

// Pro'ya yükseltme fonksiyonu (kilidi açınca tüm Pro özellikler aktif)
function upgradeToPro() {
  const user = getCurrentUser();
  if (!user) return;
  const userData = getUserData(user.id);
  userData.isPro = true;
  // Pro'ya özel: AI Planlama, PDF, Ekstra istatistikler, Topluluk, Premium panel, görevler, rozetler vs. açılır
  userData.proFeatures = {
    aiPlanning: true,
    pdfReport: true,
    extraStats: true,
    community: true,
    premium: true,
    allBadges: true,
    allTasks: true
  };
                saveUserData(user.id, userData);
  showNotification('🎉 Tebrikler! Pro üyeliğiniz aktif. Tüm özellikler açıldı!');
  showPanel(currentPanel); // Yeniden yükle
}

// Topluluk/Arkadaş Sistemi Paneli
function showCommunityPanel() {
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>🧑‍🤝‍🧑 Topluluk & Arkadaş Sistemi</h3>
      ${isProUser() ? `
        <div style="background:#e3f2fd;padding:18px 14px;border-radius:12px;margin-bottom:18px;">
          <b>Arkadaş Ekle</b><br>
          <input type="text" id="add-friend-username" placeholder="Kullanıcı adı" style="padding:8px 12px;border-radius:8px;border:1.5px solid #bbdefb;margin:8px 0;">
          <button id="add-friend-btn" style="background:#1976d2;color:#fff;padding:8px 16px;border-radius:8px;border:none;">Ekle</button>
        </div>
        <div id="friends-list" style="margin-bottom:18px;"></div>
        <div id="support-messages" style="background:#fffbe7;padding:14px 12px;border-radius:10px;"></div>
      ` : `
        <div style="background:#f8bbd0;padding:18px 14px;border-radius:12px;text-align:center;">
          <span style="font-size:2em;">🔒</span><br>
          <b>Bu özellik sadece Pro üyeler için!</b><br>
          <button onclick="upgradeToPro()" style="margin-top:10px;background:#ffd700;color:#333;padding:8px 18px;border-radius:8px;border:none;font-weight:700;">Pro'ya Yükselt</button>
        </div>
      `}
    </div>
  `;
  addBackButton();
  // Pro ise örnek arkadaş listesi ve mesajlar (dummy)
  if (isProUser()) {
    document.getElementById('friends-list').innerHTML = '<b>Arkadaşlar:</b><ul><li>fitbro_user1 <button style="margin-left:8px;">Destek Mesajı Gönder</button></li><li>fitbro_user2 <button style="margin-left:8px;">Destek Mesajı Gönder</button></li></ul>';
    document.getElementById('support-messages').innerHTML = '<b>Destek Mesajları:</b><div style="margin-top:6px;">fitbro_user2: Harikasın, devam et! 💪</div>';
  }
}

// Premium Plan Paneli
function showPremiumPanel() {
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>💸 Premium Plan</h3>
      ${isProUser() ? `
        <div style="background:#fffbe7;padding:18px 14px;border-radius:12px;margin-bottom:18px;">
          <b>Pro Özellikler:</b>
          <ul style="margin:10px 0 0 18px;">
            <li>🤖 AI destekli yemek planı</li>
            <li>✨ Otomatik öneriler</li>
            <li>🧾 PDF rapor + mail gönderimi</li>
            <li>📈 Ekstra istatistikler ve grafikler</li>
          </ul>
          <div style="margin-top:12px;color:#43a047;font-weight:600;">Pro üyeliğiniz aktif!</div>
        </div>
      ` : `
        <div style="background:#f8bbd0;padding:18px 14px;border-radius:12px;text-align:center;">
          <span style="font-size:2em;">🔒</span><br>
          <b>Bu özellikler sadece Pro üyeler için!</b><br>
          <button onclick="upgradeToPro()" style="margin-top:10px;background:#ffd700;color:#333;padding:8px 18px;border-radius:8px;border:none;font-weight:700;">Pro'ya Yükselt</button>
        </div>
      `}
    </div>
  `;
  addBackButton();
}

// --- Yemek Ekleme Hızlı ve Fotoğraftan Kontrol ---
// Enter ile hızlı ekleme
if (mealNameInput && mealCaloriesInput && addMealBtn) {
  mealNameInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); addMealBtn.click(); }
  });
  mealCaloriesInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); addMealBtn.click(); }
  });
}

// Yemek Listesini Yükle (öğüne göre filtreli)
function loadMeals() {
  const user = getCurrentUser();
  if (!user) return;
  const userData = getUserData(user.id);
  const today = new Date().toDateString();
  const todayMeals = userData.meals?.[today] || [];
  const mealListElement = document.getElementById('meal-list');
  if (!mealListElement) return;
  // Sadece başta temizle
  mealListElement.innerHTML = '';

  const mealTypes = [
    { key: 'breakfast', label: 'Kahvaltı' },
    { key: 'lunch', label: 'Öğle' },
    { key: 'dinner', label: 'Akşam' },
    { key: 'snack', label: 'Ara Öğün' }
  ];

  let hasAnyMeal = false;
  mealTypes.forEach(typeObj => {
    // Her yemeğin günün tüm yemekleri içindeki gerçek index'ini bul
    const filteredMeals = todayMeals
      .map((meal, idx) => ({ meal, idx }))
      .filter(obj => obj.meal.type === typeObj.key);
    if (filteredMeals.length > 0) {
      hasAnyMeal = true;
      // Başlık
      const header = document.createElement('div');
      header.style.fontWeight = 'bold';
      header.style.fontSize = '1.08em';
      header.style.margin = '18px 0 6px 0';
      header.textContent = typeObj.label;
      mealListElement.appendChild(header);
      // Yemekler
      filteredMeals.forEach(obj => {
        const meal = obj.meal;
        const realIndex = obj.idx;
        const mealItem = document.createElement('div');
        mealItem.className = 'meal-item';
        const mealEmoji = getMealEmoji(meal.name);
        mealItem.innerHTML = `
          <div class="meal-info">
            <span class="meal-emoji">${mealEmoji}</span>
            <div class="meal-details">
              <h4>${meal.name}</h4>
              <span class="meal-category">${typeObj.label}</span>
            </div>
          </div>
          <div class="meal-calories">${meal.calories} kcal</div>
          <button class="delete-meal-btn" onclick="deleteMealByType('${typeObj.key}',${realIndex})">🗑️</button>
        `;
        mealListElement.appendChild(mealItem);
      });
    }
  });
  if (!hasAnyMeal) {
    mealListElement.innerHTML = '<div style="text-align:center;color:#666;padding:20px;">Henüz yemek eklenmemiş</div>';
  }
}

// Sadece seçili öğündeki yemeği sil
function deleteMealByType(type, realIndex) {
    const user = getCurrentUser();
  if (!user) return;
    const userData = getUserData(user.id);
    const today = new Date().toDateString();
  const todayMeals = userData.meals?.[today] || [];
  if (realIndex >= 0 && realIndex < todayMeals.length) {
    const mealName = todayMeals[realIndex].name;
    if (confirm(`${mealName} yemeğini silmek istediğinizden emin misiniz?`)) {
      todayMeals.splice(realIndex, 1);
      userData.meals[today] = todayMeals;
      saveUserData(user.id, userData);
      loadMeals();
      updateTotalCalories();
      gamificationTrigger();
      showNotification('🗑️ Yemek silindi!');
    }
  }
}

// Toplam Kaloriyi Hesapla (tüm gün)
function calculateTotalCalories() {
  const user = getCurrentUser();
  if (!user) return 0;
  const userData = getUserData(user.id);
  const today = new Date().toDateString();
    const todayMeals = userData.meals?.[today] || [];
  // Tüm günün yemeklerini topla
  return todayMeals.reduce((total, meal) => total + (parseInt(meal.calories) || 0), 0);
}

// Toplam Kaloriyi Güncelle
function updateTotalCalories() {
  const total = calculateTotalCalories();
  const totalCaloriesElement = document.getElementById('total-calories');
  const progressFillElement = document.getElementById('calorie-progress-fill');
  if (totalCaloriesElement) {
    totalCaloriesElement.textContent = total;
  }
  if (progressFillElement) {
    const percentage = Math.min((total / 2000) * 100, 100);
    progressFillElement.style.width = `${percentage}%`;
    if (total > 2000) {
      progressFillElement.style.background = 'linear-gradient(90deg, #f44336, #d32f2f)';
    } else if (total > 1800) {
      progressFillElement.style.background = 'linear-gradient(90deg, #ff9800, #f57c00)';
    } else {
      progressFillElement.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
    }
  }
}

// Yemek Emoji'si Getir
function getMealEmoji(mealName) {
  const emojiMap = {
    'yumurta': '🥚',
    'tavuk': '🍗',
    'pirinç': '🍚',
    'elma': '🍎',
    'süt': '🥛',
    'salata': '🥗',
    'balık': '🐟',
    'muz': '🍌',
    'ekmek': '🍞',
    'peynir': '🧀',
    'domates': '🍅',
    'havuç': '🥕',
    'brokoli': '🥦',
    'patates': '🥔',
    'makarna': '🍝',
    'çorba': '🍲',
    'kahve': '☕',
    'çay': '🫖',
    'su': '💧',
    'meyve': '🍎',
    'sebze': '🥬'
  };
  
  const lowerName = mealName.toLowerCase();
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (lowerName.includes(key)) {
      return emoji;
    }
  }
  
  return '🍽️'; // Varsayılan emoji
}

// Yemek Türü Etiketi Getir
function getMealTypeLabel(type) {
  const typeMap = {
    'breakfast': 'Kahvaltı',
    'lunch': 'Öğle',
    'dinner': 'Akşam',
    'snack': 'Ara Öğün'
  };
  
  return typeMap[type] || 'Ara Öğün';
}



// Hızlı ekle butonları (daha belirgin ve kolay erişim)
document.addEventListener('DOMContentLoaded', function() {
  // Hızlı ekle butonlarına event listener ekle
  setTimeout(() => {
    document.querySelectorAll('.quick-add-btn').forEach(btn => {
      btn.style.fontSize = '1.1em';
      btn.style.padding = '12px 18px';
      btn.style.borderRadius = '10px';
      btn.style.margin = '4px 2px';
      btn.addEventListener('click', function() {
        if (mealNameInput && mealCaloriesInput && addMealBtn) {
          mealNameInput.value = btn.getAttribute('data-name');
          mealCaloriesInput.value = btn.getAttribute('data-calories');
          addMealBtn.click();
        }
      });
    });
  }, 100);
  
  // Ekle butonuna event listener ekle
  document.addEventListener('DOMContentLoaded', function() {
    if (addMealBtn) addMealBtn.addEventListener('click', addMeal);
  });
  
  // Sayfa yüklendiğinde mevcut yemekleri yükle (eğer kullanıcı giriş yapmışsa)
  setTimeout(() => {
    const user = getCurrentUser();
    if (user) {
      loadMeals();
      updateTotalCalories();
    }
  }, 200);
});

// Fotoğraftan kalori modalı
function showPhotoCalorieModal() {
  let modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.left = 0;
  modal.style.top = 0;
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0,0,0,0.25)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = 99999;
  modal.innerHTML = `
    <div style="background:#fff;border-radius:18px;box-shadow:0 4px 24px #0002;padding:32px 24px;min-width:320px;max-width:90vw;position:relative;animation:fadeInUp 0.5s;">
      <button id="close-photo-modal" style="position:absolute;top:12px;right:16px;font-size:1.3em;background:none;border:none;cursor:pointer;">✖️</button>
      <h3 style="font-family:Montserrat;font-size:1.18em;margin-bottom:18px;">📸 Fotoğraftan Kalori Tahmini</h3>
      <input type="file" id="photo-input" accept="image/*" style="margin-bottom:16px;">
      <div id="photo-predict-result" style="margin-top:18px;"></div>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById('close-photo-modal').onclick = () => modal.remove();
  document.getElementById('photo-input').onchange = function(e) {
    const resultDiv = document.getElementById('photo-predict-result');
    if (e.target.files && e.target.files[0]) {
      // Demo: Rastgele yemek ve kalori tahmini
      const foods = [
        { name: 'Tavuk Göğsü', cal: 165 },
        { name: 'Elma', cal: 52 },
        { name: 'Pirinç Pilavı', cal: 130 },
        { name: 'Yumurta', cal: 70 },
        { name: 'Muz', cal: 89 }
      ];
      const pick = foods[Math.floor(Math.random()*foods.length)];
      setTimeout(() => {
        resultDiv.innerHTML = `<b>Tahmini Yemek:</b> ${pick.name}<br><b>Tahmini Kalori:</b> ${pick.cal} kcal<br><button id='add-photo-meal' style='margin-top:10px;background:#43a047;color:#fff;padding:8px 18px;border-radius:8px;border:none;'>Yemeği Ekle</button>`;
        document.getElementById('add-photo-meal').onclick = function() {
          mealNameInput.value = pick.name;
          mealCaloriesInput.value = pick.cal;
          addMealBtn.click();
          modal.remove();
        };
      }, 1200);
      resultDiv.innerHTML = '<span style="color:#1976d2;">Tahmin yapılıyor...</span>';
    }
  };
}
// Fotoğraf butonuna event
const photoBtn = document.getElementById('photo-calorie-btn');
if (photoBtn) {
  photoBtn.onclick = showPhotoCalorieModal;
}

// Ana uygulamayı göster
function showMainApp(user) {
  authScreen.classList.add('hidden');
  mainApp.classList.remove('hidden');
  sidebarUsername.textContent = user.username;
  sidebarGenderIcon.textContent = user.gender === 'male' ? '👨' : '👩';
}

function completeWorkout() {
  showNotification('Spor tamamlandı! (Demo)');
  // Buraya gerçek spor tamamlama mantığı eklenebilir.
}

// Öğün seçimi değiştiğinde filtrele
const mealTypeSelect = document.getElementById('meal-type');
if (mealTypeSelect) {
  mealTypeSelect.addEventListener('change', function() {
    loadMeals();
    // updateTotalCalories(); // KALDIRILDI, sadece liste güncellensin
  });
} 
window.testMeals = function() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const today = new Date().toDateString();
  console.log("Bugünkü yemekler:", userData.meals?.[today]);
};

// Haftalık otomatik program öneren fonksiyon
function generateAutoSchedule() {
  // Kullanıcı AI paneli verilerini ve hedefini al
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const goal = localStorage.getItem('userGoal') || 'fit';
  // AI paneli verileri
  let weight = 70, height = 170, age = 25, gender = 'male', level = 'beginner';
  const aiWeight = document.getElementById('ai-weight');
  const aiHeight = document.getElementById('ai-height');
  const aiAge = document.getElementById('ai-age');
  const aiGender = document.querySelector('input[name="loginGender"]:checked')?.value || 'male';
  if (aiWeight) weight = parseInt(aiWeight.value) || weight;
  if (aiHeight) height = parseInt(aiHeight.value) || height;
  if (aiAge) age = parseInt(aiAge.value) || age;
  gender = aiGender;
  // Seviye (isteğe bağlı, eklenecekse)
  const aiLevel = document.getElementById('ai-level');
  if (aiLevel) level = aiLevel.value;
  // Haftalık hedef (varsayılan 3 gün)
  let weeklyGoal = 3;
  const weeklyGoalSelect = document.getElementById('weekly-goal');
  if (weeklyGoalSelect) {
    weeklyGoal = parseInt(weeklyGoalSelect.value) || 3;
  }
  // Egzersiz havuzları
  const pool = {
    fullbody: ['Full Body', 'Fonksiyonel', 'HIIT', 'Denge/Esneklik'],
    split_male: ['Göğüs', 'Sırt', 'Bacak', 'Omuz', 'Kol', 'Kardiyo'],
    split_female: ['Bacak', 'Kalça', 'Sırt', 'Karın', 'Kardiyo', 'Esneklik'],
    cardio: ['Kardiyo', 'Yürüyüş', 'Koşu', 'Bisiklet', 'Yüzme'],
    rest: ['Dinlen', 'Yoga', 'Esneme']
  };
  // Hedef ve cinsiyete göre şablon seç
  let weekPlan = [];
  if (goal === 'gain') {
    if (gender === 'female') {
      weekPlan = ['Bacak', 'Kalça', 'Dinlen', 'Sırt', 'Karın', 'Dinlen', 'Kardiyo'];
    } else {
      weekPlan = ['Göğüs', 'Sırt', 'Dinlen', 'Bacak', 'Omuz', 'Dinlen', 'Kardiyo'];
    }
  } else if (goal === 'lose') {
    weekPlan = ['Kardiyo', 'Kardiyo', 'Full Body', 'Dinlen', 'Kardiyo', 'Full Body', 'Dinlen'];
  } else {
    // fit
    weekPlan = ['Full Body', 'Dinlen', 'Kardiyo', 'Full Body', 'Dinlen', 'Kardiyo', 'Dinlen'];
  }
  // Seviye ve yaşa göre zorluk/çeşitlilik
  function pick(poolArr) {
    // Rastgele bir egzersiz seç, ama aynı haftada tekrar etmemeye çalış
    let options = poolArr.filter(x => !weekPlan.includes(x));
    if (options.length === 0) options = poolArr;
    return options[Math.floor(Math.random() * options.length)];
  }
  for (let i = 0; i < 7; i++) {
    if (weekPlan[i] === 'Full Body') {
      weekPlan[i] = pick(pool.fullbody);
    } else if (weekPlan[i] === 'Kardiyo') {
      weekPlan[i] = pick(pool.cardio);
    } else if (weekPlan[i] === 'Dinlen') {
      // Yaş büyükse veya seviye düşükse daha çok dinlenme/yoga/esneme
      if (age > 40 || level === 'beginner') weekPlan[i] = pick(pool.rest);
      else weekPlan[i] = 'Dinlen';
    } else if (goal === 'gain') {
      if (gender === 'female') weekPlan[i] = pick(pool.split_female);
      else weekPlan[i] = pick(pool.split_male);
    }
  }
  // Haftalık hedefe göre günleri doldur
  let sporGunleri = 0;
  for (let i = 0; i < 7; i++) {
    if (sporGunleri < weeklyGoal && weekPlan[i] !== 'Dinlen' && weekPlan[i] !== 'Yoga' && weekPlan[i] !== 'Esneme') {
      sporGunleri++;
    } else {
      weekPlan[i] = pick(pool.rest);
    }
  }
  // Tabloya yaz
  const table = document.getElementById('schedule-table');
  if (!table) return;
  const inputs = table.querySelectorAll('.schedule-input');
  for (let i = 0; i < 7; i++) {
    if (inputs[i]) inputs[i].value = weekPlan[i];
  }
  showNotification('Kişiselleştirilmiş haftalık program önerildi!');
}

// Kullanıcı hedefi değiştiğinde tüm önerileri güncelleyen merkezi fonksiyon
function onUserGoalChange(newGoal) {
  localStorage.setItem('userGoal', newGoal);
  updateCalorieSuggestion();
  generateAutoSchedule();
  updateAiPlanSummary();
  showNotification('Hedef değişti, öneriler güncellendi!');
}

// Günlük kalori önerisini hedefe göre güncelle
function updateCalorieSuggestion() {
  // AI paneli verilerini ve hedefi al
  const goal = localStorage.getItem('userGoal') || 'fit';
  let weight = 70, height = 170, age = 25, gender = 'male';
  const aiWeight = document.getElementById('ai-weight');
  const aiHeight = document.getElementById('ai-height');
  const aiAge = document.getElementById('ai-age');
  const aiGender = document.querySelector('input[name="loginGender"]:checked')?.value || 'male';
  if (aiWeight) weight = parseInt(aiWeight.value) || weight;
  if (aiHeight) height = parseInt(aiHeight.value) || height;
  if (aiAge) age = parseInt(aiAge.value) || age;
  gender = aiGender;
  // Kişiselleştirilmiş kalori hesaplama (Mifflin-St Jeor)
  let bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  // Aktivite katsayısı (örnek: fit=1.4, gain=1.6, lose=1.2)
  let activity = 1.4;
  if (goal === 'gain') activity = 1.6;
  else if (goal === 'lose') activity = 1.2;
  let kcal = Math.round(bmr * activity);
  // Hedefe göre ek ayarlama
  if (goal === 'gain') kcal += 200;
  if (goal === 'lose') kcal -= 200;
  // Ana ekranda ve AI planlama panelinde göster
  const goalSummary = document.getElementById('goal-summary');
  if (goalSummary) {
    goalSummary.textContent = `${kcal} kcal hedef + uygun egzersiz programı`;
  }
  // AI planlama paneli sonucu varsa güncelle
  const aiPlanResult = document.getElementById('ai-plan-result');
  if (aiPlanResult) {
    aiPlanResult.innerHTML = `<div><b>AI Önerisi:</b> Sana <b>${kcal} kcal</b> yeterli.<br>Hedef: <b>${goal === 'gain' ? 'Kas Alma' : goal === 'lose' ? 'Yağ Yakma' : 'Formda Kalma'}</b></div>`;
  }
  // Yemek bölümünde göster (varsa)
  const totalCaloriesProgress = document.getElementById('total-calories-progress');
  const calorieTargetText = document.querySelector('.calorie-target');
  if (totalCaloriesProgress) totalCaloriesProgress.textContent = kcal;
  if (calorieTargetText) calorieTargetText.innerHTML = `/ ${kcal} kcal hedef`;
}

// Hedef seçimi değiştiğinde tetikleyici ekle
setTimeout(() => {
  const goalSelect = document.getElementById('user-goal');
  if (goalSelect) {
    goalSelect.addEventListener('change', function() {
      onUserGoalChange(this.value);
    });
    // Sayfa ilk açıldığında da önerileri güncelle
    updateCalorieSuggestion();
    generateAutoSchedule();
  }
}, 300);

// AI planı özet kutusunu güncelleyen fonksiyon
function updateAiPlanSummary() {
  const aiPlanSummaryDiv = document.getElementById('ai-plan-summary');
  const plan = localStorage.getItem('aiPlanResultHtml');
  if (aiPlanSummaryDiv) {
    if (plan && plan.trim() !== '') {
      aiPlanSummaryDiv.innerHTML = plan;
    } else {
      aiPlanSummaryDiv.innerHTML = '<em>Planınızı oluşturun. Soldaki AI Planlama panelinden bilgilerinizi girip "AI Planı Oluştur" butonuna basın.</em>';
    }
  }
}
window.addEventListener('DOMContentLoaded', updateMainAiPlanSummary);

// --- AI Planlama paneli açıldığında ve plan oluşturulunca ana ekranı güncelle ---
if (typeof window.showAiPlanningPanel === 'function') {
  const _originalShowAiPlanningPanel = window.showAiPlanningPanel;
  window.showAiPlanningPanel = function() {
    _originalShowAiPlanningPanel();
    setTimeout(() => {
      const form = document.getElementById('ai-plan-form');
      if (form) {
        form.addEventListener('submit', function() {
          const resultDiv = document.getElementById('ai-plan-result');
          if (resultDiv) {
            localStorage.setItem('aiPlanResultHtml', resultDiv.innerHTML);
            updateMainAiPlanSummary();
          }
        });
      }
      updateMainAiPlanSummary();
    }, 200);
  };
}

// --- AI Planı Özeti ana ekranda dinamik gösterim ---
function updateMainAiPlanSummary() {
  const aiPlanSummaryDiv = document.getElementById('ai-plan-summary');
  const plan = localStorage.getItem('aiPlanResultHtml');
  if (aiPlanSummaryDiv) {
    if (plan && plan.trim() !== '') {
      aiPlanSummaryDiv.innerHTML = plan;
    } else {
      aiPlanSummaryDiv.innerHTML = '<em>Planınızı oluşturun. Soldaki AI Planlama panelinden bilgilerinizi girip "AI Planı Oluştur" butonuna basın.</em>';
    }
  }
}
window.addEventListener('DOMContentLoaded', updateMainAiPlanSummary);

// Kas grupları ve hareketler veritabanı
const muscleGroups = {
  chest: {
    name: "Göğüs",
    icon: "💪",
    exercises: {
      beginner: [
        { name: "Push-up (Şınav)", calories: 8, description: "Yüz üstü pozisyonda, eller omuz genişliğinde, vücudu yukarı itme" },
        { name: "Dumbbell Press", calories: 12, description: "Dumbbell ile göğüs presi, sırt düz, kontrollü hareket" },
        { name: "Chest Fly", calories: 10, description: "Dumbbell ile göğüs açma hareketi, hafif ağırlıkla başla" }
      ],
      intermediate: [
        { name: "Bench Press", calories: 15, description: "Barbell ile göğüs presi, spotter ile güvenli çalış" },
        { name: "Incline Press", calories: 14, description: "Eğimli bench'te göğüs presi, üst göğüs odaklı" },
        { name: "Decline Press", calories: 14, description: "Ters eğimli bench'te alt göğüs odaklı pres" },
        { name: "Dips", calories: 13, description: "Paralel bar'da dips, göğüs kaslarını hedefle" }
      ],
      advanced: [
        { name: "Weighted Dips", calories: 18, description: "Ağırlık eklenmiş dips, maksimum kas gelişimi" },
        { name: "Plyometric Push-ups", calories: 16, description: "Patlayıcı şınav, güç ve hız geliştirir" },
        { name: "One-Arm Push-up", calories: 20, description: "Tek kol şınav, ileri seviye göğüs çalışması" }
      ]
    }
  },
  back: {
    name: "Sırt",
    icon: "🏋️",
    exercises: {
      beginner: [
        { name: "Pull-up", calories: 10, description: "Bar'da çekme, sırt kaslarını aktif kullan" },
        { name: "Lat Pulldown", calories: 12, description: "Makinede lat çekme, kontrollü hareket" },
        { name: "Bent Over Row", calories: 11, description: "Öne eğilerek row, sırt düz tut" }
      ],
      intermediate: [
        { name: "Deadlift", calories: 20, description: "Barbell deadlift, tüm sırt kaslarını çalıştırır" },
        { name: "T-Bar Row", calories: 15, description: "T-bar makinesinde row, orta sırt odaklı" },
        { name: "Seated Cable Row", calories: 13, description: "Kablo makinesinde oturarak row" },
        { name: "Face Pull", calories: 8, description: "Yüz çekme, omuz sağlığı için önemli" }
      ],
      advanced: [
        { name: "Weighted Pull-up", calories: 18, description: "Ağırlık eklenmiş pull-up, maksimum güç" },
        { name: "Barbell Row", calories: 16, description: "Barbell ile row, ağır ağırlıkla çalış" },
        { name: "Muscle-up", calories: 25, description: "Pull-up + dip kombinasyonu, ileri seviye" }
      ]
    }
  },
  legs: {
    name: "Bacak",
    icon: "🦵",
    exercises: {
      beginner: [
        { name: "Squat", calories: 15, description: "Temel squat, dizler ayak uçlarını geçmesin" },
        { name: "Lunges", calories: 12, description: "Adım atarak lunge, dengeli hareket" },
        { name: "Leg Press", calories: 14, description: "Makinede bacak presi, güvenli başlangıç" }
      ],
      intermediate: [
        { name: "Barbell Squat", calories: 20, description: "Barbell ile squat, tüm bacak kasları" },
        { name: "Romanian Deadlift", calories: 18, description: "Hip hinge hareketi, hamstring odaklı" },
        { name: "Leg Extension", calories: 10, description: "Quadriceps izolasyon egzersizi" },
        { name: "Leg Curl", calories: 10, description: "Hamstring izolasyon egzersizi" }
      ],
      advanced: [
        { name: "Front Squat", calories: 22, description: "Ön yükleme squat, core gücü gerektirir" },
        { name: "Bulgarian Split Squat", calories: 16, description: "Tek bacak squat, denge ve güç" },
        { name: "Box Jump", calories: 18, description: "Plyometric hareket, patlayıcı güç" }
      ]
    }
  },
  shoulders: {
    name: "Omuz",
    icon: "💪",
    exercises: {
      beginner: [
        { name: "Dumbbell Press", calories: 10, description: "Dumbbell ile omuz presi, kontrollü hareket" },
        { name: "Lateral Raise", calories: 8, description: "Yan omuz kaldırma, hafif ağırlıkla" },
        { name: "Front Raise", calories: 8, description: "Ön omuz kaldırma, düzgün form" }
      ],
      intermediate: [
        { name: "Military Press", calories: 14, description: "Barbell ile askeri pres, güç geliştirir" },
        { name: "Arnold Press", calories: 12, description: "Döndürerek omuz presi, Arnold Schwarzenegger" },
        { name: "Upright Row", calories: 11, description: "Dik row, omuz ve trapez odaklı" },
        { name: "Face Pull", calories: 8, description: "Yüz çekme, omuz sağlığı" }
      ],
      advanced: [
        { name: "Handstand Push-up", calories: 20, description: "Amut şınav, ileri seviye omuz gücü" },
        { name: "Pike Push-up", calories: 15, description: "Pike pozisyonunda şınav, omuz odaklı" },
        { name: "Weighted Lateral Raise", calories: 12, description: "Ağırlık eklenmiş yan kaldırma" }
      ]
    }
  },
  "on-kol": {
    name: "Ön Kol",
    icon: "💪",
    exercises: {
      beginner: [
        { name: "Bicep Curl", calories: 8, description: "Dumbbell ile bicep curl, kontrollü hareket" },
        { name: "Hammer Curl", calories: 8, description: "Çekiç curl, ön kol da çalışır" },
        { name: "Concentration Curl", calories: 7, description: "Oturarak konsantre bicep curl" }
      ],
      intermediate: [
        { name: "Preacher Curl", calories: 10, description: "Preacher bench'te bicep curl, izolasyon" },
        { name: "Incline Curl", calories: 9, description: "Eğimli bench'te bicep curl" },
        { name: "Cable Curl", calories: 8, description: "Kablo makinesinde bicep curl" },
        { name: "Spider Curl", calories: 9, description: "Yüz üstü pozisyonda bicep curl" }
      ],
      advanced: [
        { name: "21s", calories: 12, description: "21 tekrar tekniği, bicep dayanıklılığı" },
        { name: "Drop Set Curl", calories: 15, description: "Ağırlık azaltarak drop set" },
        { name: "Zottman Curl", calories: 11, description: "Bicep curl + reverse curl kombinasyonu" }
      ]
    }
  },
  "arka-kol": {
    name: "Arka Kol",
    icon: "💪",
    exercises: {
      beginner: [
        { name: "Tricep Dip", calories: 10, description: "Tricep dips, kendi ağırlığınla" },
        { name: "Tricep Extension", calories: 8, description: "Dumbbell ile tricep extension" },
        { name: "Close Grip Push-up", calories: 9, description: "Dar tutuş şınav, tricep odaklı" }
      ],
      intermediate: [
        { name: "Skull Crushers", calories: 11, description: "Yatarak tricep extension" },
        { name: "Overhead Extension", calories: 10, description: "Baş üstü tricep extension" },
        { name: "Cable Tricep Extension", calories: 9, description: "Kablo makinesinde tricep extension" },
        { name: "Diamond Push-up", calories: 12, description: "Elmas şınav, tricep odaklı" }
      ],
      advanced: [
        { name: "Weighted Dips", calories: 15, description: "Ağırlık eklenmiş tricep dips" },
        { name: "JM Press", calories: 13, description: "Jim Wendler'in tricep presi" },
        { name: "Tricep Rope Extension", calories: 11, description: "İp ile tricep extension" }
      ]
    }
  },
  core: {
    name: "Karın",
    icon: "🔥",
    exercises: {
      beginner: [
        { name: "Crunches", calories: 6, description: "Temel crunch, kontrollü hareket" },
        { name: "Plank", calories: 8, description: "Plank pozisyonu, core stabilizasyonu" },
        { name: "Leg Raises", calories: 10, description: "Bacak kaldırma, alt karın odaklı" }
      ],
      intermediate: [
        { name: "Russian Twist", calories: 12, description: "Rus dönüşü, yan karın kasları" },
        { name: "Mountain Climbers", calories: 14, description: "Dağ tırmanıcısı, dinamik core" },
        { name: "Bicycle Crunch", calories: 11, description: "Bisiklet crunch, tam karın çalışması" },
        { name: "Side Plank", calories: 9, description: "Yan plank, yan karın kasları" }
      ],
      advanced: [
        { name: "Dragon Flag", calories: 18, description: "Ejderha bayrağı, ileri seviye core" },
        { name: "L-Sit", calories: 15, description: "L oturuş, güç ve denge gerektirir" },
        { name: "Windshield Wipers", calories: 16, description: "Silecek hareketi, tam core kontrolü" }
      ]
    }
  },
  kardiyo: {
    name: "Kardiyo",
    icon: "❤️",
    exercises: {
      beginner: [
        { name: "Yürüyüş", calories: 5, description: "Tempolu yürüyüş, kalp sağlığı için ideal" },
        { name: "Jumping Jacks", calories: 8, description: "Klasik jumping jack, kardiyo başlangıcı" },
        { name: "Stationary Bike", calories: 10, description: "Sabit bisiklet, düşük etkili kardiyo" }
      ],
      intermediate: [
        { name: "Koşu", calories: 15, description: "Tempolu koşu, dayanıklılık geliştirir" },
        { name: "Burpees", calories: 20, description: "Tam vücut kardiyo, güç + kardiyo" },
        { name: "Mountain Climbers", calories: 14, description: "Dinamik kardiyo, core da çalışır" },
        { name: "High Knees", calories: 12, description: "Yüksek diz kaldırma, koordinasyon" }
      ],
      advanced: [
        { name: "HIIT Training", calories: 25, description: "Yüksek yoğunluklu interval antrenman" },
        { name: "Sprint Intervals", calories: 30, description: "Sprint + dinlenme aralıkları" },
        { name: "Plyometric Jumps", calories: 22, description: "Patlayıcı zıplama, güç + kardiyo" }
      ]
    }
  },
  fullBody: {
    name: "Tüm Vücut",
    icon: "🏃‍♂️",
    exercises: {
      beginner: [
        { name: "Burpees", calories: 20, description: "Tam vücut egzersiz, kardiyo + güç" },
        { name: "Mountain Climbers", calories: 14, description: "Dinamik core ve kardiyo" },
        { name: "Jumping Jacks", calories: 12, description: "Klasik jumping jack, kardiyo" }
      ],
      intermediate: [
        { name: "Thrusters", calories: 25, description: "Squat + push press kombinasyonu" },
        { name: "Man Makers", calories: 22, description: "Dumbbell ile kompleks hareket" },
        { name: "Turkish Get-up", calories: 20, description: "Türk kalkışı, koordinasyon" },
        { name: "Bear Crawl", calories: 18, description: "Ayı sürünmesi, core ve omuz" }
      ],
      advanced: [
        { name: "Muscle-up", calories: 30, description: "Pull-up + dip, ileri seviye" },
        { name: "Handstand Walk", calories: 28, description: "Amut yürüyüş, denge ve güç" },
        { name: "Planche", calories: 25, description: "Planche pozisyonu, maksimum güç" }
      ]
    }
  }
};

// Spor durumu takibi
let currentWorkout = {
  isActive: false,
  startTime: null,
  selectedMuscleGroups: [],
  completedExercises: [],
  totalCalories: 0,
  aiPlan: null
};

// Kas grubu seçim panelini göster
function showMuscleSelectionPanel() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const aiPlan = userData.aiPlan;
  
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>💪 Kas Grubu Seçimi</h3>
      
      ${aiPlan ? `
        <div class="ai-plan-info">
          <div class="ai-plan-badge">🤖 AI Planından</div>
          <p><strong>Hedef:</strong> ${aiPlan.hedefText}</p>
          <p><strong>Deneyim:</strong> ${aiPlan.deneyimSeviyesi}</p>
          <p><strong>Önerilen Süre:</strong> ${aiPlan.sporSuresi} dakika</p>
        </div>
      ` : `
        <div class="no-ai-plan">
          <p>⚠️ AI planı oluşturulmamış. Önce AI planlamasından kişisel planınızı oluşturun.</p>
          <button onclick="showPanel('ai-planning')" class="ai-plan-btn">🧬 AI Planı Oluştur</button>
        </div>
      `}
      
      <div class="muscle-selection-container">
        <h4>🎯 Çalıştırmak İstediğiniz Kas Gruplarını Seçin</h4>
        
        <div class="muscle-grid">
          ${Object.entries(muscleGroups).map(([key, muscle]) => `
            <div class="muscle-card" data-muscle="${key}">
              <div class="muscle-icon">${muscle.icon}</div>
              <div class="muscle-name">${muscle.name}</div>
              <div class="muscle-checkbox">
                <input type="checkbox" id="muscle-${key}" class="muscle-checkbox-input">
                <label for="muscle-${key}" class="muscle-checkbox-label"></label>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="workout-controls">
          <button id="start-workout" class="start-workout-btn" ${!aiPlan ? 'disabled' : ''}>
            🏃‍♂️ Sporu Başlat
          </button>
          <button id="stop-workout" class="stop-workout-btn" style="display: none;">
            ⏹️ Sporu Bitir
          </button>
        </div>
      </div>
      
      <div id="workout-progress" class="workout-progress" style="display: none;">
        <h4>📊 Spor İlerlemesi</h4>
        <div class="progress-stats">
          <div class="progress-item">
            <span class="progress-icon">⏱️</span>
            <span class="progress-value" id="workout-time">00:00</span>
            <span class="progress-label">Süre</span>
          </div>
          <div class="progress-item">
            <span class="progress-icon">🔥</span>
            <span class="progress-value" id="burned-calories">0</span>
            <span class="progress-label">Kalori</span>
          </div>
          <div class="progress-item">
            <span class="progress-icon">💪</span>
            <span class="progress-value" id="completed-exercises">0</span>
            <span class="progress-label">Hareket</span>
          </div>
        </div>
      </div>
      
      <div id="exercise-recommendations" class="exercise-recommendations" style="display: none;">
        <h4>🎯 Önerilen Hareketler</h4>
        <div id="recommended-exercises"></div>
      </div>
    </div>
  `;
  addBackButton();
  
  // Event listener'ları ekle
  setTimeout(() => {
    setupMuscleSelectionEvents();
  }, 100);
}

// Kas seçim event'lerini ayarla
function setupMuscleSelectionEvents() {
  const muscleCards = document.querySelectorAll('.muscle-card');
  const startBtn = document.getElementById('start-workout');
  const stopBtn = document.getElementById('stop-workout');
  
  // Kas kartı tıklama
  muscleCards.forEach(card => {
    card.addEventListener('click', function() {
      const checkbox = this.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
      this.classList.toggle('selected', checkbox.checked);
      updateStartButton();
    });
  });
  
  // Spor başlat
  if (startBtn) {
    startBtn.addEventListener('click', startWorkout);
  }
  
  // Spor bitir
  if (stopBtn) {
    stopBtn.addEventListener('click', stopWorkout);
  }
}

// Başlat butonunu güncelle
function updateStartButton() {
  const selectedMuscles = document.querySelectorAll('.muscle-checkbox-input:checked');
  const startBtn = document.getElementById('start-workout');
  
  if (startBtn) {
    startBtn.disabled = selectedMuscles.length === 0;
    startBtn.textContent = selectedMuscles.length > 0 ? 
      `🏃‍♂️ Sporu Başlat (${selectedMuscles.length} kas grubu)` : 
      '🏃‍♂️ Sporu Başlat';
  }
}

// Sporu başlat
function startWorkout() {
  const selectedMuscles = Array.from(document.querySelectorAll('.muscle-checkbox-input:checked'))
    .map(checkbox => checkbox.id.replace('muscle-', ''));
  
  if (selectedMuscles.length === 0) {
    showNotification('⚠️ En az bir kas grubu seçmelisiniz!');
    return;
  }
  
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const aiPlan = userData.aiPlan;
  
  // Spor durumunu başlat
  currentWorkout = {
    isActive: true,
    startTime: new Date(),
    selectedMuscleGroups: selectedMuscles,
    completedExercises: [],
    totalCalories: 0,
    aiPlan: aiPlan
  };
  
  // UI'ı güncelle
  document.getElementById('start-workout').style.display = 'none';
  document.getElementById('stop-workout').style.display = 'block';
  document.getElementById('workout-progress').style.display = 'block';
  document.getElementById('exercise-recommendations').style.display = 'block';
  
  // Önerilen hareketleri göster
  showRecommendedExercises(selectedMuscles, aiPlan);
  
  // Zamanlayıcıyı başlat
  startWorkoutTimer();
  
  showNotification('🏃‍♂️ Spor başladı! İyi antrenmanlar!');
}

// Sporu bitir
function stopWorkout() {
  if (!currentWorkout.isActive) return;
  
  const endTime = new Date();
  const duration = Math.floor((endTime - currentWorkout.startTime) / 1000 / 60); // dakika
  
  // Spor verilerini kaydet
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  const workoutData = {
    date: new Date().toISOString(),
    duration: duration,
    calories: currentWorkout.totalCalories,
    muscleGroups: currentWorkout.selectedMuscleGroups,
    exercises: currentWorkout.completedExercises,
    aiPlan: currentWorkout.aiPlan
  };
  
  if (!userData.completedWorkouts) {
    userData.completedWorkouts = {};
  }
  
  const dateKey = new Date().toDateString();
  if (!userData.completedWorkouts[dateKey]) {
    userData.completedWorkouts[dateKey] = [];
  }
  
  userData.completedWorkouts[dateKey].push(workoutData);
  saveUserData(user.id, userData);
  
  // XP ve seviye kontrolü
  addXP(userData, Math.floor(currentWorkout.totalCalories / 10));
  checkLevelUp(userData);
  
  // Sonuç modalını göster
  showWorkoutResult(workoutData);
  
  // Spor durumunu sıfırla
  currentWorkout = {
    isActive: false,
    startTime: null,
    selectedMuscleGroups: [],
    completedExercises: [],
    totalCalories: 0,
    aiPlan: null
  };
  
  // UI'ı sıfırla
  document.getElementById('start-workout').style.display = 'block';
  document.getElementById('stop-workout').style.display = 'none';
  document.getElementById('workout-progress').style.display = 'none';
  document.getElementById('exercise-recommendations').style.display = 'none';
  
  // Zamanlayıcıyı durdur
  stopWorkoutTimer();
  
  showNotification(`🎉 Spor tamamlandı! ${duration} dakika, ${currentWorkout.totalCalories} kalori yakıldı!`);
  
  // Spor özetini güncelle
  updateWorkoutSummaryAfterCompletion();
}

// Zamanlayıcı
let workoutTimer = null;

function startWorkoutTimer() {
  workoutTimer = setInterval(() => {
    if (currentWorkout.isActive && currentWorkout.startTime) {
      const elapsed = Math.floor((new Date() - currentWorkout.startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      
      document.getElementById('workout-time').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }, 1000);
}

function stopWorkoutTimer() {
  if (workoutTimer) {
    clearInterval(workoutTimer);
    workoutTimer = null;
  }
}

// Önerilen hareketleri göster
function showRecommendedExercises(selectedMuscles, aiPlan) {
  const recommendationsDiv = document.getElementById('recommended-exercises');
  const experience = aiPlan ? aiPlan.experience : 'beginner';
  
  let exercisesHtml = '';
  
  selectedMuscles.forEach(muscleKey => {
    const muscle = muscleGroups[muscleKey];
    const exercises = muscle.exercises[experience] || muscle.exercises.beginner;
    
    exercisesHtml += `
      <div class="muscle-exercises">
        <h5>${muscle.icon} ${muscle.name}</h5>
        <div class="exercise-list">
          ${exercises.map(exercise => `
            <div class="exercise-item" data-exercise="${exercise.name}" data-calories="${exercise.calories}">
              <div class="exercise-header">
                <span class="exercise-name">${exercise.name}</span>
                <span class="exercise-calories">🔥 ${exercise.calories} kalori</span>
              </div>
              <div class="exercise-description">${exercise.description}</div>
              <button class="complete-exercise-btn" onclick="completeExercise('${exercise.name}', ${exercise.calories})">
                ✅ Tamamla
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });
  
  recommendationsDiv.innerHTML = exercisesHtml;
}

// Hareketi tamamla
function completeExercise(exerciseName, calories) {
  if (!currentWorkout.isActive) return;
  
  currentWorkout.completedExercises.push({
    name: exerciseName,
    calories: calories,
    completedAt: new Date().toISOString()
  });
  
  currentWorkout.totalCalories += calories;
  
  // UI'ı güncelle
  document.getElementById('burned-calories').textContent = currentWorkout.totalCalories;
  document.getElementById('completed-exercises').textContent = currentWorkout.completedExercises.length;
  
  // Tamamlanan hareketi işaretle
  const exerciseItem = document.querySelector(`[data-exercise="${exerciseName}"]`);
  if (exerciseItem) {
    exerciseItem.classList.add('completed');
    const completeBtn = exerciseItem.querySelector('.complete-exercise-btn');
    completeBtn.textContent = '✅ Tamamlandı';
    completeBtn.disabled = true;
  }
  
  showNotification(`✅ ${exerciseName} tamamlandı! +${calories} kalori`);
}

// Spor sonucu modalını göster
function showWorkoutResult(workoutData) {
  const modal = document.createElement('div');
  modal.className = 'workout-result-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>🎉 Spor Tamamlandı!</h3>
        <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">✕</button>
      </div>
      <div class="modal-body">
        <div class="result-stats">
          <div class="result-item">
            <span class="result-icon">⏱️</span>
            <span class="result-value">${workoutData.duration} dakika</span>
            <span class="result-label">Süre</span>
          </div>
          <div class="result-item">
            <span class="result-icon">🔥</span>
            <span class="result-value">${workoutData.calories} kalori</span>
            <span class="result-label">Yakılan</span>
          </div>
          <div class="result-item">
            <span class="result-icon">💪</span>
            <span class="result-value">${workoutData.exercises.length}</span>
            <span class="result-label">Hareket</span>
          </div>
        </div>
        
        <div class="completed-exercises">
          <h4>✅ Tamamlanan Hareketler</h4>
          <ul>
            ${workoutData.exercises.map(ex => `
              <li>${ex.name} - 🔥 ${ex.calories} kalori</li>
            `).join('')}
          </ul>
        </div>
        
        <div class="muscle-groups">
          <h4>🎯 Çalıştırılan Kas Grupları</h4>
          <div class="muscle-tags">
            ${workoutData.muscleGroups.map(mg => `
              <span class="muscle-tag">${muscleGroups[mg].icon} ${muscleGroups[mg].name}</span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// Ana sayfa spor fonksiyonları
function setupMainPageWorkout() {
  const startBtn = document.getElementById('start-workout-main');
  const stopBtn = document.getElementById('stop-workout-main');
  
  if (startBtn) {
    startBtn.addEventListener('click', startMainPageWorkout);
  }
  
  if (stopBtn) {
    stopBtn.addEventListener('click', stopMainPageWorkout);
  }
}

// Ana sayfada sporu başlat
function startMainPageWorkout() {
  // Seçilen kas gruplarını al
  const selectedMuscles = getSelectedMusclesFromMainPage();
  
  if (selectedMuscles.length === 0) {
    showNotification('⚠️ En az bir kas grubu seçmelisiniz!');
    return;
  }
  
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const aiPlan = userData.aiPlan;
  
  // Spor durumunu başlat
  currentWorkout = {
    isActive: true,
    startTime: new Date(),
    selectedMuscleGroups: selectedMuscles,
    completedExercises: [],
    totalCalories: 0,
    aiPlan: aiPlan
  };
  
  // UI'ı güncelle
  document.getElementById('start-workout-main').style.display = 'none';
  document.getElementById('stop-workout-main').style.display = 'block';
  document.getElementById('workout-progress-main').style.display = 'block';
  document.getElementById('exercise-recommendations-main').style.display = 'block';
  
  // Önerilen hareketleri göster
  showMainPageRecommendedExercises(selectedMuscles, aiPlan);
  
  // Zamanlayıcıyı başlat
  startMainPageWorkoutTimer();
  
  showNotification('🏃‍♂️ Spor başladı! İyi antrenmanlar!');
}

// Ana sayfada sporu bitir
function stopMainPageWorkout() {
  if (!currentWorkout.isActive) return;
  
  const endTime = new Date();
  const duration = Math.floor((endTime - currentWorkout.startTime) / 1000 / 60); // dakika
  
  // Spor verilerini kaydet
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  const workoutData = {
    date: new Date().toISOString(),
    duration: duration,
    calories: currentWorkout.totalCalories,
    muscleGroups: currentWorkout.selectedMuscleGroups,
    exercises: currentWorkout.completedExercises,
    aiPlan: currentWorkout.aiPlan
  };
  
  if (!userData.completedWorkouts) {
    userData.completedWorkouts = {};
  }
  
  const dateKey = new Date().toDateString();
  if (!userData.completedWorkouts[dateKey]) {
    userData.completedWorkouts[dateKey] = [];
  }
  
  userData.completedWorkouts[dateKey].push(workoutData);
  saveUserData(user.id, userData);
  
  // XP ve seviye kontrolü
  addXP(userData, Math.floor(currentWorkout.totalCalories / 10));
  checkLevelUp(userData);
  
  // Sonuç modalını göster
  showWorkoutResult(workoutData);
  
  // Spor durumunu sıfırla
  currentWorkout = {
    isActive: false,
    startTime: null,
    selectedMuscleGroups: [],
    completedExercises: [],
    totalCalories: 0,
    aiPlan: null
  };
  
  // UI'ı sıfırla
  document.getElementById('start-workout-main').style.display = 'block';
  document.getElementById('stop-workout-main').style.display = 'none';
  document.getElementById('workout-progress-main').style.display = 'none';
  document.getElementById('exercise-recommendations-main').style.display = 'none';
  
  // Zamanlayıcıyı durdur
  stopMainPageWorkoutTimer();
  
  showNotification(`🎉 Spor tamamlandı! ${duration} dakika, ${currentWorkout.totalCalories} kalori yakıldı!`);
  
  // Spor özetini güncelle
  updateWorkoutSummaryAfterCompletion();
}

// Ana sayfadan seçilen kas gruplarını al
function getSelectedMusclesFromMainPage() {
  const selectedMuscles = [];
  const svgElement = document.querySelector('#svg-container svg');
  
  if (svgElement) {
    svgElement.querySelectorAll('[data-muscle]').forEach(el => {
      if (el.getAttribute('fill') === '#ff4d4f') {
        selectedMuscles.push(el.getAttribute('data-muscle'));
      }
    });
  }
  
  return selectedMuscles;
}

// Ana sayfa zamanlayıcı
let mainPageWorkoutTimer = null;

function startMainPageWorkoutTimer() {
  mainPageWorkoutTimer = setInterval(() => {
    if (currentWorkout.isActive && currentWorkout.startTime) {
      const elapsed = Math.floor((new Date() - currentWorkout.startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      
      const timeElement = document.getElementById('workout-time-main');
      if (timeElement) {
        timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }
  }, 1000);
}

function stopMainPageWorkoutTimer() {
  if (mainPageWorkoutTimer) {
    clearInterval(mainPageWorkoutTimer);
    mainPageWorkoutTimer = null;
  }
}

// Ana sayfada önerilen hareketleri göster
function showMainPageRecommendedExercises(selectedMuscles, aiPlan) {
  const recommendationsDiv = document.getElementById('recommended-exercises-main');
  const experience = aiPlan ? aiPlan.experience : 'beginner';
  
  let exercisesHtml = '';
  
  selectedMuscles.forEach(muscleKey => {
    const muscle = muscleGroups[muscleKey];
    if (muscle) {
      const exercises = muscle.exercises[experience] || muscle.exercises.beginner;
      
      exercisesHtml += `
        <div class="muscle-exercises-main">
          <h5>${muscle.icon} ${muscle.name}</h5>
          <div class="exercise-list-main">
            ${exercises.map(exercise => `
              <div class="exercise-item-main" data-exercise="${exercise.name}" data-calories="${exercise.calories}">
                <div class="exercise-header-main">
                  <span class="exercise-name-main">${exercise.name}</span>
                  <span class="exercise-calories-main">🔥 ${exercise.calories} kalori</span>
                </div>
                <div class="exercise-description-main">${exercise.description}</div>
                <button class="complete-exercise-btn-main" onclick="completeMainPageExercise('${exercise.name}', ${exercise.calories})">
                  ✅ Tamamla
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  });
  
  if (recommendationsDiv) {
    recommendationsDiv.innerHTML = exercisesHtml;
  }
}

// Ana sayfada hareketi tamamla
function completeMainPageExercise(exerciseName, calories) {
  if (!currentWorkout.isActive) return;
  
  currentWorkout.completedExercises.push({
    name: exerciseName,
    calories: calories,
    completedAt: new Date().toISOString()
  });
  
  currentWorkout.totalCalories += calories;
  
  // UI'ı güncelle
  const caloriesElement = document.getElementById('burned-calories-main');
  const exercisesElement = document.getElementById('completed-exercises-main');
  
  if (caloriesElement) {
    caloriesElement.textContent = currentWorkout.totalCalories;
  }
  
  if (exercisesElement) {
    exercisesElement.textContent = currentWorkout.completedExercises.length;
  }
  
  // Tamamlanan hareketi işaretle
  const exerciseItem = document.querySelector(`[data-exercise="${exerciseName}"]`);
  if (exerciseItem) {
    exerciseItem.classList.add('completed');
    const completeBtn = exerciseItem.querySelector('.complete-exercise-btn-main');
    if (completeBtn) {
      completeBtn.textContent = '✅ Tamamlandı';
      completeBtn.disabled = true;
    }
  }
  
  showNotification(`✅ ${exerciseName} tamamlandı! +${calories} kalori`);
}

// Sayfa yüklendiğinde ana sayfa spor fonksiyonlarını ayarla
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    setupMainPageWorkout();
  }, 1000);
});

// Spor özeti bölümünü güncelle
function updateWorkoutSummary() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.completedWorkouts) {
    userData.completedWorkouts = {};
  }
  
  // Bugünkü spor verilerini hesapla
  const today = new Date().toDateString();
  const todayWorkouts = userData.completedWorkouts[today] || [];
  
  let todayCalories = 0;
  let todayDuration = 0;
  let todayExercises = 0;
  
  todayWorkouts.forEach(workout => {
    todayCalories += workout.calories || 0;
    todayDuration += workout.duration || 0;
    todayExercises += workout.exercises ? workout.exercises.length : 0;
  });
  
  // Bugünkü istatistikleri güncelle
  document.getElementById('today-calories').textContent = todayCalories;
  document.getElementById('today-duration').textContent = todayDuration;
  document.getElementById('today-exercises').textContent = todayExercises;
  
  // Haftalık istatistikleri güncelle
  updateWeeklyStats(userData);
  
  // Son sporları güncelle
  updateRecentWorkouts(userData);
}

// Haftalık istatistikleri güncelle
function updateWeeklyStats(userData) {
  const days = ['pazar', 'pazartesi', 'sali', 'carsamba', 'persembe', 'cuma', 'cumartesi'];
  const dayIds = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  
  // Bu haftanın başlangıç tarihini hesapla (Pazartesi)
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
  
  days.forEach((day, index) => {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + index);
    const dayKey = dayDate.toDateString();
    
    const dayWorkouts = userData.completedWorkouts[dayKey] || [];
    let dayCalories = 0;
    
    dayWorkouts.forEach(workout => {
      dayCalories += workout.calories || 0;
    });
    
    const caloriesElement = document.getElementById(`${dayIds[index]}-calories`);
    if (caloriesElement) {
      caloriesElement.textContent = dayCalories;
    }
    
    // Bugünün gününü vurgula
    const dayElement = document.querySelector(`[data-day="${day}"]`);
    if (dayElement) {
      if (dayDate.toDateString() === today.toDateString()) {
        dayElement.classList.add('active');
      } else {
        dayElement.classList.remove('active');
      }
    }
  });
}

// Son sporları güncelle
function updateRecentWorkouts(userData) {
  const recentList = document.getElementById('recent-workouts-list');
  
  if (!userData.completedWorkouts || Object.keys(userData.completedWorkouts).length === 0) {
    recentList.innerHTML = '<div class="no-workouts">Henüz spor yapılmamış</div>';
    return;
  }
  
  // Tüm sporları topla ve tarihe göre sırala
  let allWorkouts = [];
  Object.keys(userData.completedWorkouts).forEach(dateKey => {
    userData.completedWorkouts[dateKey].forEach(workout => {
      allWorkouts.push({
        ...workout,
        dateKey: dateKey
      });
    });
  });
  
  // Son 5 sporu al
  allWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const recentWorkouts = allWorkouts.slice(0, 5);
  
  if (recentWorkouts.length === 0) {
    recentList.innerHTML = '<div class="no-workouts">Henüz spor yapılmamış</div>';
    return;
  }
  
  recentList.innerHTML = recentWorkouts.map(workout => {
    const workoutDate = new Date(workout.date);
    const dateStr = workoutDate.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short'
    });
    
    const muscleGroups = workout.muscleGroups ? workout.muscleGroups.map(mg => {
      const muscleNames = {
        'chest': 'Göğüs',
        'back': 'Sırt',
        'legs': 'Bacak',
        'shoulders': 'Omuz',
        'arms': 'Kol',
        'core': 'Karın',
        'fullBody': 'Tüm Vücut'
      };
      return muscleNames[mg] || mg;
    }).join(', ') : '';
    
    return `
      <div class="workout-item">
        <div class="workout-info">
          <div class="workout-date">${dateStr}</div>
          <div class="workout-details">
            ${workout.duration} dk • ${muscleGroups}
          </div>
        </div>
        <div class="workout-calories">
          🔥 ${workout.calories}
        </div>
      </div>
    `;
  }).join('');
}

// Sayfa yüklendiğinde spor özetini güncelle
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    updateWorkoutSummary();
  }, 1000);
});

// Spor tamamlandığında özeti güncelle
function updateWorkoutSummaryAfterCompletion() {
  updateWorkoutSummary();
}

// Gelişmiş kullanıcı veri yapısı
function initializeAdvancedUserData(userId) {
  const userData = getUserData(userId);
  
  // Vücut ölçüleri takibi
  if (!userData.bodyMeasurements) {
    userData.bodyMeasurements = {
      weight: [],
      height: 0,
      chest: [],
      waist: [],
      arms: [],
      legs: [],
      bodyFat: [],
      muscleMass: []
    };
  }
  
  // Sağlık takibi
  if (!userData.healthData) {
    userData.healthData = {
      sleepQuality: [],
      stepCount: [],
      heartRate: [],
      bloodPressure: [],
      waterIntake: []
    };
  }
  
  // Hedefler sistemi
  if (!userData.goals) {
    userData.goals = {
      shortTerm: [], // Haftalık hedefler
      longTerm: [],  // Aylık/yıllık hedefler
      completed: [],
      motivationMessages: []
    };
  }
  
  // Fotoğraf ve video sistemi
  if (!userData.media) {
    userData.media = {
      progressPhotos: [],
      workoutVideos: [],
      exerciseTutorials: []
    };
  }
  
  // Bildirim ayarları
  if (!userData.notifications) {
    userData.notifications = {
      mealReminders: true,
      workoutReminders: true,
      waterReminders: true,
      goalReminders: true,
      sleepReminders: true,
      pushEnabled: false
    };
  }
  
  // Tema ve ayarlar
  if (!userData.settings) {
    userData.settings = {
      theme: 'light', // light, dark
      language: 'tr',
      units: 'metric', // metric, imperial
      privacyLevel: 'private', // private, friends, public
      autoBackup: true
    };
  }
  
  // Premium özellikler
  if (!userData.premium) {
    userData.premium = {
      isPremium: false,
      features: [],
      subscriptionDate: null,
      personalTrainer: false,
      customNutritionPlans: false,
      videoConsultation: false
    };
  }
  
  // Sosyal özellikler
  if (!userData.social) {
    userData.social = {
      friends: [],
      leaderboard: [],
      achievements: [],
      posts: [],
      privacySettings: {
        profileVisibility: 'private',
        workoutSharing: false,
        progressSharing: false
      }
    };
  }
  
  // AI ve analiz
  if (!userData.aiAnalytics) {
    userData.aiAnalytics = {
      performancePredictions: [],
      injuryRiskAnalysis: [],
      nutritionRecommendations: [],
      workoutOptimization: [],
      smartGoals: []
    };
  }
  
  saveUserData(userId, userData);
  return userData;
}

// Vücut ölçüleri ekleme
function addBodyMeasurement(userId, measurementType, value, date = new Date()) {
  const userData = getUserData(userId);
  if (!userData.bodyMeasurements) {
    initializeAdvancedUserData(userId);
  }
  
  const measurement = {
    value: value,
    date: date.toISOString(),
    timestamp: date.getTime()
  };
  
  userData.bodyMeasurements[measurementType].push(measurement);
  saveUserData(userId, userData);
  
  // Trend analizi güncelle
  updateTrendAnalysis(userId);
  
  showNotification(`✅ ${measurementType} ölçüsü kaydedildi: ${value}`);
}

// Sağlık verisi ekleme
function addHealthData(userId, dataType, value, date = new Date()) {
  const userData = getUserData(userId);
  if (!userData.healthData) {
    initializeAdvancedUserData(userId);
  }
  
  const healthRecord = {
    value: value,
    date: date.toISOString(),
    timestamp: date.getTime()
  };
  
  userData.healthData[dataType].push(healthRecord);
  saveUserData(userId, userData);
  
  showNotification(`✅ ${dataType} verisi kaydedildi: ${value}`);
}

// Hedef oluşturma (SMART hedefler)
function createSmartGoal(userId, goalData) {
  const userData = getUserData(userId);
  if (!userData.goals) {
    initializeAdvancedUserData(userId);
  }
  
  const goal = {
    id: Date.now().toString(),
    title: goalData.title,
    description: goalData.description,
    type: goalData.type, // weight, muscle, endurance, etc.
    target: goalData.target,
    current: goalData.current || 0,
    unit: goalData.unit,
    deadline: goalData.deadline,
    progress: 0,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    milestones: goalData.milestones || [],
    motivationMessage: goalData.motivationMessage || "Hedefine ulaşmak için çalışmaya devam et!"
  };
  
  if (goalData.deadline && new Date(goalData.deadline) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) {
    userData.goals.shortTerm.push(goal);
  } else {
    userData.goals.longTerm.push(goal);
  }
  
  saveUserData(userId, userData);
  
  showNotification(`🎯 Yeni hedef oluşturuldu: ${goal.title}`);
  return goal;
}

// Hedef ilerlemesini güncelle
function updateGoalProgress(userId, goalId, newValue) {
  const userData = getUserData(userId);
  const allGoals = [...userData.goals.shortTerm, ...userData.goals.longTerm];
  const goal = allGoals.find(g => g.id === goalId);
  
  if (goal) {
    goal.current = newValue;
    goal.progress = Math.min((newValue / goal.target) * 100, 100);
    
    // Hedef tamamlandı mı kontrol et
    if (goal.progress >= 100 && !goal.isCompleted) {
      goal.isCompleted = true;
      goal.completedAt = new Date().toISOString();
      userData.goals.completed.push(goal);
      
      // Başarı rozeti ver
      addAchievement(userId, 'goal_completed', goal.title);
      
      showNotification(`🎉 Hedef tamamlandı: ${goal.title}!`);
    }
    
    saveUserData(userId, userData);
  }
}

// Başarı sistemi
function addAchievement(userId, achievementType, description) {
  const userData = getUserData(userId);
  if (!userData.social) {
    initializeAdvancedUserData(userId);
  }
  
  const achievement = {
    id: Date.now().toString(),
    type: achievementType,
    description: description,
    earnedAt: new Date().toISOString(),
    points: getAchievementPoints(achievementType)
  };
  
  userData.social.achievements.push(achievement);
  saveUserData(userId, userData);
  
  showNotification(`🏆 Başarı kazandın: ${description}`);
}

// Başarı puanları
function getAchievementPoints(type) {
  const points = {
    'goal_completed': 100,
    'workout_streak_7': 50,
    'workout_streak_30': 200,
    'calories_1000': 25,
    'exercises_10': 30,
    'weight_loss_5kg': 150,
    'muscle_gain_2kg': 150
  };
  return points[type] || 10;
}

// Trend analizi
function updateTrendAnalysis(userId) {
  const userData = getUserData(userId);
  const measurements = userData.bodyMeasurements;
  
  // Kilo trendi
  if (measurements.weight && measurements.weight.length > 1) {
    const recentWeights = measurements.weight.slice(-7); // Son 7 ölçüm
    const trend = calculateTrend(recentWeights.map(w => w.value));
    userData.weightTrend = trend;
  }
  
  // Kas grubu performans analizi
  if (userData.completedWorkouts) {
    const musclePerformance = analyzeMuscleGroupPerformance(userData.completedWorkouts);
    userData.musclePerformance = musclePerformance;
  }
  
  saveUserData(userId, userData);
}

// Trend hesaplama
function calculateTrend(values) {
  if (values.length < 2) return 'stable';
  
  const first = values[0];
  const last = values[values.length - 1];
  const change = last - first;
  const percentChange = (change / first) * 100;
  
  if (percentChange > 2) return 'increasing';
  if (percentChange < -2) return 'decreasing';
  return 'stable';
}

// Kas grubu performans analizi
function analyzeMuscleGroupPerformance(workouts) {
  const performance = {};
  
  Object.keys(workouts).forEach(date => {
    workouts[date].forEach(workout => {
      workout.muscleGroups.forEach(muscle => {
        if (!performance[muscle]) {
          performance[muscle] = {
            totalWorkouts: 0,
            totalCalories: 0,
            totalDuration: 0,
            exercises: []
          };
        }
        
        performance[muscle].totalWorkouts++;
        performance[muscle].totalCalories += workout.calories;
        performance[muscle].totalDuration += workout.duration;
        
        if (workout.exercises) {
          performance[muscle].exercises.push(...workout.exercises);
        }
      });
    });
  });
  
  return performance;
}

// Bildirim sistemi
function setupNotifications(userId) {
  const userData = getUserData(userId);
  if (!userData.notifications) {
    initializeAdvancedUserData(userId);
  }
  
  // Öğün zamanı bildirimleri
  if (userData.notifications.mealReminders) {
    scheduleMealReminders();
  }
  
  // Spor hatırlatıcıları
  if (userData.notifications.workoutReminders) {
    scheduleWorkoutReminders();
  }
  
  // Su içme hatırlatıcıları
  if (userData.notifications.waterReminders) {
    scheduleWaterReminders();
  }
}

// Öğün hatırlatıcıları
function scheduleMealReminders() {
  const mealTimes = [
    { time: '08:00', meal: 'Kahvaltı' },
    { time: '12:00', meal: 'Öğle Yemeği' },
    { time: '15:00', meal: 'Ara Öğün' },
    { time: '18:00', meal: 'Akşam Yemeği' },
    { time: '21:00', meal: 'Gece Ara Öğünü' }
  ];
  
  mealTimes.forEach(meal => {
    // Burada gerçek bildirim sistemi entegre edilecek
    console.log(`${meal.meal} hatırlatıcısı ayarlandı: ${meal.time}`);
  });
}

// Tema değiştirme
function toggleTheme() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.settings) {
    initializeAdvancedUserData(user.id);
  }
  
  userData.settings.theme = userData.settings.theme === 'light' ? 'dark' : 'light';
  saveUserData(user.id, userData);
  
  applyTheme(userData.settings.theme);
  showNotification(`🎨 Tema değiştirildi: ${userData.settings.theme === 'light' ? 'Aydınlık' : 'Karanlık'}`);
}

// Temayı uygula
function applyTheme(theme) {
  const body = document.body;
  if (theme === 'dark') {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }
}

// Fotoğraf ekleme
function addProgressPhoto(userId, photoData) {
  const userData = getUserData(user.id);
  if (!userData.media) {
    initializeAdvancedUserData(userId);
  }
  
  const photo = {
    id: Date.now().toString(),
    url: photoData.url,
    type: photoData.type, // before, after, progress
    date: new Date().toISOString(),
    description: photoData.description || '',
    measurements: photoData.measurements || {}
  };
  
  userData.media.progressPhotos.push(photo);
  saveUserData(userId, userData);
  
  showNotification(`📸 İlerleme fotoğrafı eklendi`);
}

// Liderlik tablosu
function updateLeaderboard() {
  const allUsers = getAllUsers();
  const leaderboard = [];
  
  allUsers.forEach(user => {
    const userData = getUserData(user.id);
    if (userData.completedWorkouts) {
      let totalCalories = 0;
      let totalWorkouts = 0;
      
      Object.keys(userData.completedWorkouts).forEach(date => {
        userData.completedWorkouts[date].forEach(workout => {
          totalCalories += workout.calories;
          totalWorkouts++;
        });
      });
      
      leaderboard.push({
        userId: user.id,
        username: user.username,
        totalCalories: totalCalories,
        totalWorkouts: totalWorkouts,
        level: userData.level || 1,
        achievements: userData.social?.achievements?.length || 0
      });
    }
  });
  
  // Kaloriye göre sırala
  leaderboard.sort((a, b) => b.totalCalories - a.totalCalories);
  
  return leaderboard.slice(0, 10); // İlk 10
}

// PWA desteği
function setupPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('PWA Service Worker kayıt edildi');
      })
      .catch(error => {
        console.log('PWA Service Worker kayıt hatası:', error);
      });
  }
}

// Offline veri senkronizasyonu
function setupOfflineSync() {
  // Offline veri saklama
  if ('indexedDB' in window) {
    // IndexedDB ile offline veri saklama
    console.log('Offline veri senkronizasyonu aktif');
  }
}

// Kamera erişimi
function requestCameraAccess() {
  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        console.log('Kamera erişimi sağlandı');
        // Kamera stream'ini kullan
      })
      .catch(error => {
        console.log('Kamera erişim hatası:', error);
      });
  }
}

// Sensör kullanımı (adım sayısı, kalp atış hızı)
function setupSensors() {
  if ('DeviceMotionEvent' in window) {
    window.addEventListener('devicemotion', (event) => {
      // Hareket sensörü verilerini işle
      const acceleration = event.acceleration;
      if (acceleration) {
        // Adım sayısı hesaplama
        detectStep(acceleration);
      }
    });
  }
  
  if ('DeviceOrientationEvent' in window) {
    window.addEventListener('deviceorientation', (event) => {
      // Yön sensörü verilerini işle
    });
  }
}

// Adım tespiti
function detectStep(acceleration) {
  // Basit adım tespit algoritması
  const magnitude = Math.sqrt(
    acceleration.x * acceleration.x +
    acceleration.y * acceleration.y +
    acceleration.z * acceleration.z
  );
  
  // Eşik değeri kontrolü
  if (magnitude > 15) {
    incrementStepCount();
  }
}

// Adım sayısını artır
function incrementStepCount() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.healthData) {
    initializeAdvancedUserData(user.id);
  }
  
  const today = new Date().toDateString();
  const todaySteps = userData.healthData.stepCount.find(s => 
    new Date(s.date).toDateString() === today
  );
  
  if (todaySteps) {
    todaySteps.value++;
  } else {
    userData.healthData.stepCount.push({
      value: 1,
      date: new Date().toISOString(),
      timestamp: Date.now()
    });
  }
  
  saveUserData(user.id, userData);
}

// AI beslenme önerileri
function generateNutritionRecommendations(userId) {
  const userData = getUserData(userId);
  const aiPlan = userData.aiPlan;
  const healthData = userData.healthData;
  
  let recommendations = [];
  
  if (aiPlan) {
    if (aiPlan.hedef === 'weight_loss') {
      recommendations.push({
        type: 'protein',
        message: 'Günde en az 1.6g/kg protein alın',
        foods: ['Tavuk göğsü', 'Balık', 'Yumurta', 'Yoğurt']
      });
    } else if (aiPlan.hedef === 'muscle_gain') {
      recommendations.push({
        type: 'calories',
        message: 'Kalori fazlası oluşturun (günde +300-500 kcal)',
        foods: ['Kuruyemiş', 'Avokado', 'Zeytinyağı', 'Tam tahıllar']
      });
    }
  }
  
  // Su içme önerisi
  if (healthData && healthData.waterIntake) {
    const todayWater = healthData.waterIntake.find(w => 
      new Date(w.date).toDateString() === new Date().toDateString()
    );
    
    if (!todayWater || todayWater.value < 2000) {
      recommendations.push({
        type: 'hydration',
        message: 'Günde en az 2L su için',
        foods: ['Su', 'Çay', 'Maden suyu']
      });
    }
  }
  
  return recommendations;
}

// Performans tahminleri
function predictPerformance(userId) {
  const userData = getUserData(userId);
  const workouts = userData.completedWorkouts;
  
  if (!workouts) return null;
  
  // Son 30 günlük veri analizi
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  let totalCalories = 0;
  let totalWorkouts = 0;
  let totalDuration = 0;
  
  Object.keys(workouts).forEach(date => {
    const workoutDate = new Date(date);
    if (workoutDate >= thirtyDaysAgo) {
      workouts[date].forEach(workout => {
        totalCalories += workout.calories;
        totalWorkouts++;
        totalDuration += workout.duration;
      });
    }
  });
  
  const avgCaloriesPerWorkout = totalWorkouts > 0 ? totalCalories / totalWorkouts : 0;
  const avgDurationPerWorkout = totalWorkouts > 0 ? totalDuration / totalWorkouts : 0;
  
  // Gelecek hafta tahmini
  const weeklyPrediction = {
    estimatedWorkouts: Math.min(totalWorkouts / 4, 5), // Haftada max 5
    estimatedCalories: avgCaloriesPerWorkout * Math.min(totalWorkouts / 4, 5),
    estimatedDuration: avgDurationPerWorkout * Math.min(totalWorkouts / 4, 5),
    confidence: totalWorkouts > 10 ? 'high' : totalWorkouts > 5 ? 'medium' : 'low'
  };
  
  return weeklyPrediction;
}

// Yaralanma riski analizi
function analyzeInjuryRisk(userId) {
  const userData = getUserData(userId);
  const workouts = userData.completedWorkouts;
  
  if (!workouts) return null;
  
  let riskFactors = [];
  let riskLevel = 'low';
  
  // Aşırı antrenman kontrolü
  const lastWeekWorkouts = getWorkoutsInLastDays(7);
  if (lastWeekWorkouts.length > 6) {
    riskFactors.push('Aşırı antrenman - haftada 6+ spor');
    riskLevel = 'medium';
  }
  
  // Aynı kas grubunu sürekli çalıştırma
  const muscleFrequency = analyzeMuscleFrequency();
  Object.keys(muscleFrequency).forEach(muscle => {
    if (muscleFrequency[muscle] > 3) {
      riskFactors.push(`${muscle} kas grubu çok sık çalıştırılıyor`);
      riskLevel = 'medium';
    }
  });
  
  // Dinlenme günü eksikliği
  const restDays = calculateRestDays();
  if (restDays < 2) {
    riskFactors.push('Yetersiz dinlenme günü');
    riskLevel = 'high';
  }
  
  return {
    riskLevel: riskLevel,
    factors: riskFactors,
    recommendations: generateInjuryPreventionRecommendations(riskFactors)
  };
}

// Son X günün sporlarını al
function getWorkoutsInLastDays(days) {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const workouts = userData.completedWorkouts;
  
  if (!workouts) return [];
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  let recentWorkouts = [];
  Object.keys(workouts).forEach(date => {
    const workoutDate = new Date(date);
    if (workoutDate >= cutoffDate) {
      recentWorkouts.push(...workouts[date]);
    }
  });
  
  return recentWorkouts;
}

// Kas grubu sıklığını analiz et
function analyzeMuscleFrequency() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  const workouts = userData.completedWorkouts;
  
  if (!workouts) return {};
  
  const muscleFrequency = {};
  Object.keys(workouts).forEach(date => {
    workouts[date].forEach(workout => {
      workout.muscleGroups.forEach(muscle => {
        muscleFrequency[muscle] = (muscleFrequency[muscle] || 0) + 1;
      });
    });
  });
  
  return muscleFrequency;
}

// Dinlenme günlerini hesapla
function calculateRestDays() {
  const recentWorkouts = getWorkoutsInLastDays(7);
  return 7 - recentWorkouts.length;
}

// Yaralanma önleme önerileri
function generateInjuryPreventionRecommendations(riskFactors) {
  const recommendations = [];
  
  if (riskFactors.includes('Aşırı antrenman')) {
    recommendations.push('Haftada en fazla 5 gün spor yapın');
    recommendations.push('Dinlenme günlerinde hafif aktiviteler yapın');
  }
  
  if (riskFactors.includes('Yetersiz dinlenme günü')) {
    recommendations.push('Haftada en az 2 dinlenme günü planlayın');
    recommendations.push('Uyku kalitenizi artırın');
  }
  
  if (riskFactors.some(f => f.includes('kas grubu çok sık'))) {
    recommendations.push('Kas gruplarını dönüşümlü çalıştırın');
    recommendations.push('Split program uygulayın');
  }
  
  return recommendations;
}

// Premium özellik kontrolü
function checkPremiumFeature(userId, feature) {
  const userData = getUserData(userId);
  if (!userData.premium) {
    initializeAdvancedUserData(userId);
  }
  
  return userData.premium.isPremium && userData.premium.features.includes(feature);
}

// Premium özellik kullanımı
function usePremiumFeature(userId, feature) {
  if (checkPremiumFeature(userId, feature)) {
    return true;
  } else {
    showNotification('🔒 Bu özellik Premium üyelik gerektirir');
    return false;
  }
}

// Veri yedekleme
function backupUserData(userId) {
  const userData = getUserData(userId);
  const backup = {
    timestamp: new Date().toISOString(),
    data: userData
  };
  
  const backupKey = `backup_${userId}_${Date.now()}`;
  localStorage.setItem(backupKey, JSON.stringify(backup));
  
  showNotification('💾 Veri yedeklendi');
  return backupKey;
}

// Veri geri yükleme
function restoreUserData(userId, backupKey) {
  const backupData = localStorage.getItem(backupKey);
  if (backupData) {
    const backup = JSON.parse(backupData);
    saveUserData(userId, backup.data);
    showNotification('📥 Veri geri yüklendi');
    return true;
  }
  return false;
}

// Gizlilik ayarları
function updatePrivacySettings(userId, settings) {
  const userData = getUserData(userId);
  if (!userData.social) {
    initializeAdvancedUserData(userId);
  }
  
  userData.social.privacySettings = {
    ...userData.social.privacySettings,
    ...settings
  };
  
  saveUserData(userId, userData);
  showNotification('🔒 Gizlilik ayarları güncellendi');
}

// Kullanıcı verilerini başlat
document.addEventListener('DOMContentLoaded', function() {
  const user = getCurrentUser();
  if (user) {
    initializeAdvancedUserData(user.id);
    setupNotifications(user.id);
    setupPWA();
    setupOfflineSync();
    setupSensors();
    applyTheme(getUserData(user.id).settings?.theme || 'light');
  }
});

// Vücut Takibi Paneli
function showBodyTrackingPanel() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>📏 Vücut Takibi</h3>
      
      <!-- Vücut Ölçüleri Girişi -->
      <div class="measurement-input-section">
        <h4>📊 Yeni Ölçüm Ekle</h4>
        <div class="measurement-form">
          <div class="form-group">
            <label for="measurement-type">Ölçüm Türü:</label>
            <select id="measurement-type" class="form-select">
              <option value="weight">Kilo (kg)</option>
              <option value="height">Boy (cm)</option>
              <option value="chest">Göğüs (cm)</option>
              <option value="waist">Bel (cm)</option>
              <option value="arms">Kol (cm)</option>
              <option value="legs">Bacak (cm)</option>
              <option value="bodyFat">Vücut Yağı (%)</option>
              <option value="muscleMass">Kas Kütlesi (kg)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="measurement-value">Değer:</label>
            <input type="number" id="measurement-value" class="form-input" step="0.1" placeholder="Ölçüm değeri">
          </div>
          
          <button onclick="addNewMeasurement()" class="btn-primary">📏 Ölçüm Ekle</button>
        </div>
      </div>
      
      <!-- Kilo Trendi -->
      <div class="weight-trend-section">
        <h4>⚖️ Kilo Trendi</h4>
        <div id="weight-chart" class="chart-container">
          <canvas id="weightChart"></canvas>
        </div>
        <div id="weight-trend-info" class="trend-info"></div>
      </div>
      
      <!-- Tüm Ölçümler -->
      <div class="all-measurements-section">
        <h4>📋 Tüm Ölçümler</h4>
        <div id="measurements-list" class="measurements-list"></div>
      </div>
    </div>
  `;
  addBackButton();
  
  // Grafikleri yükle
  setTimeout(() => {
    loadWeightChart();
    loadAllMeasurements();
  }, 100);
}

// Sağlık Takibi Paneli
function showHealthMonitoringPanel() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>🏥 Sağlık Takibi</h3>
      
      <!-- Sağlık Verisi Girişi -->
      <div class="health-input-section">
        <h4>📊 Sağlık Verisi Ekle</h4>
        <div class="health-form">
          <div class="form-group">
            <label for="health-data-type">Veri Türü:</label>
            <select id="health-data-type" class="form-select">
              <option value="sleepQuality">Uyku Kalitesi (1-10)</option>
              <option value="stepCount">Adım Sayısı</option>
              <option value="heartRate">Kalp Atış Hızı (bpm)</option>
              <option value="bloodPressure">Kan Basıncı (sistolik/diastolik)</option>
              <option value="waterIntake">Su İçimi (ml)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="health-data-value">Değer:</label>
            <input type="text" id="health-data-value" class="form-input" placeholder="Veri değeri">
          </div>
          
          <button onclick="addNewHealthData()" class="btn-primary">🏥 Veri Ekle</button>
        </div>
      </div>
      
      <!-- Günlük Özet -->
      <div class="daily-health-summary">
        <h4>📈 Günlük Sağlık Özeti</h4>
        <div class="health-stats-grid">
          <div class="health-stat-card">
            <div class="stat-icon">😴</div>
            <div class="stat-value" id="today-sleep">-</div>
            <div class="stat-label">Uyku Kalitesi</div>
          </div>
          <div class="health-stat-card">
            <div class="stat-icon">👟</div>
            <div class="stat-value" id="today-steps">0</div>
            <div class="stat-label">Adım</div>
          </div>
          <div class="health-stat-card">
            <div class="stat-icon">💓</div>
            <div class="stat-value" id="today-heart-rate">-</div>
            <div class="stat-label">Kalp Atışı</div>
          </div>
          <div class="health-stat-card">
            <div class="stat-icon">💧</div>
            <div class="stat-value" id="today-water">0ml</div>
            <div class="stat-label">Su</div>
          </div>
        </div>
      </div>
      
      <!-- Su İçme Takibi -->
      <div class="water-tracking-section">
        <h4>💧 Su İçme Takibi</h4>
        <div class="water-progress">
          <div class="water-goal">Hedef: 2000ml</div>
          <div class="water-progress-bar">
            <div id="water-progress-fill" class="water-progress-fill"></div>
          </div>
          <div class="water-buttons">
            <button onclick="addWater(250)" class="water-btn">250ml</button>
            <button onclick="addWater(500)" class="water-btn">500ml</button>
            <button onclick="addWater(1000)" class="water-btn">1L</button>
          </div>
        </div>
      </div>
    </div>
  `;
  addBackButton();
  
  // Sağlık verilerini yükle
  setTimeout(() => {
    loadDailyHealthData();
  }, 100);
}

// Hedefler Paneli
function showGoalsPanel() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>🎯 Hedefler</h3>
      
      <!-- Yeni Hedef Oluştur -->
      <div class="goal-creation-section">
        <h4>➕ Yeni Hedef Oluştur</h4>
        <div class="goal-form">
          <div class="form-group">
            <label for="goal-title">Hedef Başlığı:</label>
            <input type="text" id="goal-title" class="form-input" placeholder="Örn: 5kg kilo ver">
          </div>
          
          <div class="form-group">
            <label for="goal-description">Açıklama:</label>
            <textarea id="goal-description" class="form-textarea" placeholder="Hedefiniz hakkında detaylar..."></textarea>
          </div>
          
          <div class="form-group">
            <label for="goal-type">Hedef Türü:</label>
            <select id="goal-type" class="form-select">
              <option value="weight">Kilo Hedefi</option>
              <option value="muscle">Kas Kazanımı</option>
              <option value="endurance">Dayanıklılık</option>
              <option value="strength">Güç</option>
              <option value="flexibility">Esneklik</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="goal-target">Hedef Değer:</label>
            <input type="number" id="goal-target" class="form-input" step="0.1" placeholder="Hedef değer">
          </div>
          
          <div class="form-group">
            <label for="goal-unit">Birim:</label>
            <input type="text" id="goal-unit" class="form-input" placeholder="kg, cm, dk, vs.">
          </div>
          
          <div class="form-group">
            <label for="goal-deadline">Bitiş Tarihi:</label>
            <input type="date" id="goal-deadline" class="form-input">
          </div>
          
          <button onclick="createNewGoal()" class="btn-primary">🎯 Hedef Oluştur</button>
        </div>
      </div>
      
      <!-- Aktif Hedefler -->
      <div class="active-goals-section">
        <h4>📋 Aktif Hedefler</h4>
        <div id="active-goals-list" class="goals-list"></div>
      </div>
      
      <!-- Tamamlanan Hedefler -->
      <div class="completed-goals-section">
        <h4>✅ Tamamlanan Hedefler</h4>
        <div id="completed-goals-list" class="goals-list"></div>
      </div>
    </div>
  `;
  addBackButton();
  
  // Hedefleri yükle
  setTimeout(() => {
    loadGoals();
  }, 100);
}

// İlerleme Fotoğrafları Paneli
function showProgressPhotosPanel() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>📸 İlerleme Fotoğrafları</h3>
      
      <!-- Fotoğraf Ekleme -->
      <div class="photo-upload-section">
        <h4>📷 Yeni Fotoğraf Ekle</h4>
        <div class="photo-form">
          <div class="form-group">
            <label for="photo-type">Fotoğraf Türü:</label>
            <select id="photo-type" class="form-select">
              <option value="before">Öncesi</option>
              <option value="after">Sonrası</option>
              <option value="progress">İlerleme</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="photo-description">Açıklama:</label>
            <textarea id="photo-description" class="form-textarea" placeholder="Fotoğraf hakkında notlar..."></textarea>
          </div>
          
          <div class="photo-upload-area">
            <input type="file" id="photo-file" accept="image/*" style="display: none;">
            <button onclick="document.getElementById('photo-file').click()" class="photo-upload-btn">
              📷 Fotoğraf Seç
            </button>
          </div>
          
          <button onclick="uploadProgressPhoto()" class="btn-primary">📸 Fotoğraf Yükle</button>
        </div>
      </div>
      
      <!-- Fotoğraf Galerisi -->
      <div class="photo-gallery-section">
        <h4>🖼️ Fotoğraf Galerisi</h4>
        <div id="progress-photos-gallery" class="photo-gallery"></div>
      </div>
    </div>
  `;
  addBackButton();
  
  // Fotoğrafları yükle
  setTimeout(() => {
    loadProgressPhotos();
  }, 100);
}

// Liderlik Tablosu Paneli
function showLeaderboardPanel() {
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>🏆 Liderlik Tablosu</h3>
      
      <!-- Filtreler -->
      <div class="leaderboard-filters">
        <button class="filter-btn active" data-filter="calories">🔥 Kalori</button>
        <button class="filter-btn" data-filter="workouts">💪 Spor Sayısı</button>
        <button class="filter-btn" data-filter="streak">🔥 Üst Üste</button>
        <button class="filter-btn" data-filter="level">⭐ Seviye</button>
      </div>
      
      <!-- Liderlik Tablosu -->
      <div class="leaderboard-table">
        <div id="leaderboard-list" class="leaderboard-list">
          <div class="loading">🏆 Liderlik tablosu yükleniyor...</div>
        </div>
      </div>
      
      <!-- Benim Sıralamam -->
      <div class="my-ranking-section">
        <h4>👤 Benim Sıralamam</h4>
        <div id="my-ranking" class="my-ranking"></div>
      </div>
    </div>
  `;
  addBackButton();
  
  // Liderlik tablosunu yükle
  setTimeout(() => {
    loadLeaderboard();
  }, 100);
}

// AI Analiz Paneli
function showAiAnalyticsPanel() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>🤖 AI Analiz</h3>
      
      <!-- Performans Tahmini -->
      <div class="performance-prediction-section">
        <h4>🔮 Performans Tahmini</h4>
        <div id="performance-prediction" class="prediction-card">
          <div class="loading">AI analiz yapılıyor...</div>
        </div>
      </div>
      
      <!-- Yaralanma Riski Analizi -->
      <div class="injury-risk-section">
        <h4>⚠️ Yaralanma Riski Analizi</h4>
        <div id="injury-risk-analysis" class="risk-card">
          <div class="loading">Risk analizi yapılıyor...</div>
        </div>
      </div>
      
      <!-- Beslenme Önerileri -->
      <div class="nutrition-recommendations-section">
        <h4>🍎 AI Beslenme Önerileri</h4>
        <div id="nutrition-recommendations" class="recommendations-list">
          <div class="loading">Beslenme önerileri hazırlanıyor...</div>
        </div>
      </div>
      
      <!-- Spor Programı Optimizasyonu -->
      <div class="workout-optimization-section">
        <h4>⚡ Spor Programı Optimizasyonu</h4>
        <div id="workout-optimization" class="optimization-card">
          <div class="loading">Program optimizasyonu yapılıyor...</div>
        </div>
      </div>
    </div>
  `;
  addBackButton();
  
  // AI analizlerini yükle
  setTimeout(() => {
    loadAiAnalytics();
  }, 100);
}

// Ayarlar Paneli
function showSettingsPanel() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  sidebarContent.innerHTML = `
    <div class="panel-container">
      <h3>⚙️ Ayarlar</h3>
      
      <!-- Tema Ayarları -->
      <div class="theme-settings-section">
        <h4>🎨 Tema</h4>
        <div class="theme-options">
          <label class="theme-option">
            <input type="radio" name="theme" value="light" ${userData.settings?.theme === 'light' ? 'checked' : ''}>
            <span class="theme-label">☀️ Aydınlık</span>
          </label>
          <label class="theme-option">
            <input type="radio" name="theme" value="dark" ${userData.settings?.theme === 'dark' ? 'checked' : ''}>
            <span class="theme-label">🌙 Karanlık</span>
          </label>
        </div>
      </div>
      
      <!-- Bildirim Ayarları -->
      <div class="notification-settings-section">
        <h4>🔔 Bildirimler</h4>
        <div class="notification-options">
          <label class="notification-option">
            <input type="checkbox" id="meal-reminders" ${userData.notifications?.mealReminders ? 'checked' : ''}>
            <span class="notification-label">🍽️ Öğün Hatırlatıcıları</span>
          </label>
          <label class="notification-option">
            <input type="checkbox" id="workout-reminders" ${userData.notifications?.workoutReminders ? 'checked' : ''}>
            <span class="notification-label">🏃‍♂️ Spor Hatırlatıcıları</span>
          </label>
          <label class="notification-option">
            <input type="checkbox" id="water-reminders" ${userData.notifications?.waterReminders ? 'checked' : ''}>
            <span class="notification-label">💧 Su İçme Hatırlatıcıları</span>
          </label>
          <label class="notification-option">
            <input type="checkbox" id="goal-reminders" ${userData.notifications?.goalReminders ? 'checked' : ''}>
            <span class="notification-label">🎯 Hedef Hatırlatıcıları</span>
          </label>
        </div>
      </div>
      
      <!-- Gizlilik Ayarları -->
      <div class="privacy-settings-section">
        <h4>🔒 Gizlilik</h4>
        <div class="privacy-options">
          <label class="privacy-option">
            <input type="radio" name="privacy" value="private" ${userData.social?.privacySettings?.profileVisibility === 'private' ? 'checked' : ''}>
            <span class="privacy-label">🔒 Özel</span>
          </label>
          <label class="privacy-option">
            <input type="radio" name="privacy" value="friends" ${userData.social?.privacySettings?.profileVisibility === 'friends' ? 'checked' : ''}>
            <span class="privacy-label">👥 Arkadaşlar</span>
          </label>
          <label class="privacy-option">
            <input type="radio" name="privacy" value="public" ${userData.social?.privacySettings?.profileVisibility === 'public' ? 'checked' : ''}>
            <span class="privacy-label">🌍 Herkese Açık</span>
          </label>
        </div>
      </div>
      
      <!-- Reklam Yönetimi (Sadece Admin) -->
      <div class="ad-management-section">
        <h4>📢 Reklam Yönetimi</h4>
        <div class="ad-controls">
          <button onclick="toggleAdSense()" class="btn-secondary" id="adsense-toggle">
            ${adManager?.adSenseEnabled ? '🔴 AdSense\'i Kapat' : '🟢 AdSense\'i Aç'}
          </button>
          <button onclick="showAdStats()" class="btn-secondary">📊 Reklam İstatistikleri</button>
        </div>
        <div class="ad-info">
          <p><strong>Mevcut Durum:</strong> ${adManager?.adSenseEnabled ? 'AdSense Aktif' : 'Placeholder Reklamlar'}</p>
          <p><strong>Premium Kullanıcılar:</strong> Reklam görmez</p>
        </div>
      </div>

      <!-- Veri Yönetimi -->
      <div class="data-management-section">
        <h4>💾 Veri Yönetimi</h4>
        <div class="data-buttons">
          <button onclick="backupUserData('${user.id}')" class="btn-secondary">💾 Veri Yedekle</button>
          <button onclick="exportUserData()" class="btn-secondary">📤 Veri Dışa Aktar</button>
          <button onclick="clearUserData()" class="btn-danger">🗑️ Verileri Temizle</button>
        </div>
      </div>
      
      <!-- Hakkında -->
      <div class="about-section">
        <h4>ℹ️ Hakkında</h4>
        <div class="about-info">
          <p><strong>Versiyon:</strong> 2.0.0</p>
          <p><strong>Geliştirici:</strong> FitBro Team</p>
          <p><strong>Lisans:</strong> MIT</p>
        </div>
      </div>
    </div>
  `;
  addBackButton();
  
  // Event listener'ları ekle
  setTimeout(() => {
    setupSettingsEventListeners();
  }, 100);
}

// Ayarlar event listener'larını ayarla
function setupSettingsEventListeners() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  // Tema değiştirme
  const themeRadios = document.querySelectorAll('input[name="theme"]');
  themeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        toggleTheme();
      }
    });
  });
  
  // Bildirim ayarları
  const notificationCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  notificationCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      updateNotificationSettings(this.id, this.checked);
    });
  });
  
  // Gizlilik ayarları
  const privacyRadios = document.querySelectorAll('input[name="privacy"]');
  privacyRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        updatePrivacySettings(user.id, { profileVisibility: this.value });
      }
    });
  });
}

// Bildirim ayarlarını güncelle
function updateNotificationSettings(settingId, enabled) {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.notifications) {
    initializeAdvancedUserData(user.id);
  }
  
  const settingMap = {
    'meal-reminders': 'mealReminders',
    'workout-reminders': 'workoutReminders',
    'water-reminders': 'waterReminders',
    'goal-reminders': 'goalReminders'
  };
  
  const settingKey = settingMap[settingId];
  if (settingKey) {
    userData.notifications[settingKey] = enabled;
    saveUserData(user.id, userData);
    
    // Bildirim sistemini yeniden ayarla
    if (enabled) {
      setupNotifications(user.id);
    }
    
    showNotification(`🔔 ${settingId.replace('-', ' ')} ${enabled ? 'açıldı' : 'kapatıldı'}`);
  }
}

// Yeni ölçüm ekleme
function addNewMeasurement() {
  const user = getCurrentUser();
  const measurementType = document.getElementById('measurement-type').value;
  const measurementValue = parseFloat(document.getElementById('measurement-value').value);
  
  if (!measurementValue || isNaN(measurementValue)) {
    showNotification('⚠️ Lütfen geçerli bir değer girin!');
    return;
  }
  
  addBodyMeasurement(user.id, measurementType, measurementValue);
  
  // Formu temizle
  document.getElementById('measurement-value').value = '';
  
  // Grafikleri yenile
  loadWeightChart();
  loadAllMeasurements();
}

// Yeni sağlık verisi ekleme
function addNewHealthData() {
  const user = getCurrentUser();
  const dataType = document.getElementById('health-data-type').value;
  const dataValue = document.getElementById('health-data-value').value;
  
  if (!dataValue) {
    showNotification('⚠️ Lütfen bir değer girin!');
    return;
  }
  
  addHealthData(user.id, dataType, dataValue);
  
  // Formu temizle
  document.getElementById('health-data-value').value = '';
  
  // Sağlık verilerini yenile
  loadDailyHealthData();
}

// Su ekleme
function addWater(amount) {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.healthData) {
    initializeAdvancedUserData(user.id);
  }
  
  const today = new Date().toDateString();
  const todayWater = userData.healthData.waterIntake.find(w => 
    new Date(w.date).toDateString() === today
  );
  
  if (todayWater) {
    todayWater.value += amount;
  } else {
    userData.healthData.waterIntake.push({
      value: amount,
      date: new Date().toISOString(),
      timestamp: Date.now()
    });
  }
  
  saveUserData(user.id, userData);
  
  // Su progress bar'ını güncelle
  updateWaterProgress();
  
  showNotification(`💧 ${amount}ml su eklendi!`);
}

// Su progress bar'ını güncelle
function updateWaterProgress() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.healthData) return;
  
  const today = new Date().toDateString();
  const todayWater = userData.healthData.waterIntake.find(w => 
    new Date(w.date).toDateString() === today
  );
  
  const currentWater = todayWater ? todayWater.value : 0;
  const targetWater = 2000; // 2L hedef
  const progress = Math.min((currentWater / targetWater) * 100, 100);
  
  const progressFill = document.getElementById('water-progress-fill');
  const waterValue = document.getElementById('today-water');
  
  if (progressFill) {
    progressFill.style.width = `${progress}%`;
  }
  
  if (waterValue) {
    waterValue.textContent = `${currentWater}ml`;
  }
}

// Yeni hedef oluşturma
function createNewGoal() {
  const user = getCurrentUser();
  const title = document.getElementById('goal-title').value;
  const description = document.getElementById('goal-description').value;
  const type = document.getElementById('goal-type').value;
  const target = parseFloat(document.getElementById('goal-target').value);
  const unit = document.getElementById('goal-unit').value;
  const deadline = document.getElementById('goal-deadline').value;
  
  if (!title || !target || !unit || !deadline) {
    showNotification('⚠️ Lütfen tüm alanları doldurun!');
    return;
  }
  
  const goalData = {
    title: title,
    description: description,
    type: type,
    target: target,
    unit: unit,
    deadline: deadline
  };
  
  createSmartGoal(user.id, goalData);
  
  // Formu temizle
  document.getElementById('goal-title').value = '';
  document.getElementById('goal-description').value = '';
  document.getElementById('goal-target').value = '';
  document.getElementById('goal-unit').value = '';
  document.getElementById('goal-deadline').value = '';
  
  // Hedefleri yenile
  loadGoals();
}

// İlerleme fotoğrafı yükleme
function uploadProgressPhoto() {
  const user = getCurrentUser();
  const photoType = document.getElementById('photo-type').value;
  const photoDescription = document.getElementById('photo-description').value;
  const photoFile = document.getElementById('photo-file').files[0];
  
  if (!photoFile) {
    showNotification('⚠️ Lütfen bir fotoğraf seçin!');
    return;
  }
  
  // Dosyayı base64'e çevir
  const reader = new FileReader();
  reader.onload = function(e) {
    const photoData = {
      url: e.target.result,
      type: photoType,
      description: photoDescription
    };
    
    addProgressPhoto(user.id, photoData);
    
    // Formu temizle
    document.getElementById('photo-description').value = '';
    document.getElementById('photo-file').value = '';
    
    // Fotoğrafları yenile
    loadProgressPhotos();
  };
  
  reader.readAsDataURL(photoFile);
}

// Kilo grafiğini yükle
function loadWeightChart() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.bodyMeasurements || !userData.bodyMeasurements.weight) {
    document.getElementById('weight-chart').innerHTML = '<p>Henüz kilo verisi yok</p>';
    return;
  }
  
  const weights = userData.bodyMeasurements.weight.slice(-10); // Son 10 ölçüm
  const labels = weights.map(w => new Date(w.date).toLocaleDateString('tr-TR'));
  const data = weights.map(w => w.value);
  
  const ctx = document.getElementById('weightChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Kilo (kg)',
          data: data,
          borderColor: '#1DB954',
          backgroundColor: 'rgba(29, 185, 84, 0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: document.body.classList.contains('dark-theme') ? '#ffffff' : '#333333'
            }
          }
        },
        scales: {
          y: {
            ticks: {
              color: document.body.classList.contains('dark-theme') ? '#ffffff' : '#333333'
            }
          },
          x: {
            ticks: {
              color: document.body.classList.contains('dark-theme') ? '#ffffff' : '#333333'
            }
          }
        }
      }
    });
  }
  
  // Trend bilgisini güncelle
  updateWeightTrendInfo(weights);
}

// Kilo trend bilgisini güncelle
function updateWeightTrendInfo(weights) {
  if (weights.length < 2) return;
  
  const firstWeight = weights[0].value;
  const lastWeight = weights[weights.length - 1].value;
  const change = lastWeight - firstWeight;
  const percentChange = ((change / firstWeight) * 100).toFixed(1);
  
  const trendInfo = document.getElementById('weight-trend-info');
  if (trendInfo) {
    let trendText = '';
    if (change > 0) {
      trendText = `📈 Son ${weights.length} ölçümde +${change.toFixed(1)}kg (+${percentChange}%)`;
    } else if (change < 0) {
      trendText = `📉 Son ${weights.length} ölçümde ${change.toFixed(1)}kg (${percentChange}%)`;
    } else {
      trendText = `➡️ Son ${weights.length} ölçümde değişim yok`;
    }
    trendInfo.textContent = trendText;
  }
}

// Tüm ölçümleri yükle
function loadAllMeasurements() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.bodyMeasurements) {
    document.getElementById('measurements-list').innerHTML = '<p>Henüz ölçüm verisi yok</p>';
    return;
  }
  
  const measurementsList = document.getElementById('measurements-list');
  let html = '';
  
  Object.keys(userData.bodyMeasurements).forEach(type => {
    const measurements = userData.bodyMeasurements[type];
    if (measurements && measurements.length > 0) {
      const latest = measurements[measurements.length - 1];
      const measurementNames = {
        weight: 'Kilo',
        height: 'Boy',
        chest: 'Göğüs',
        waist: 'Bel',
        arms: 'Kol',
        legs: 'Bacak',
        bodyFat: 'Vücut Yağı',
        muscleMass: 'Kas Kütlesi'
      };
      
      html += `
        <div class="measurement-item">
          <div class="measurement-name">${measurementNames[type]}</div>
          <div class="measurement-value">${latest.value}</div>
          <div class="measurement-date">${new Date(latest.date).toLocaleDateString('tr-TR')}</div>
        </div>
      `;
    }
  });
  
  measurementsList.innerHTML = html || '<p>Henüz ölçüm verisi yok</p>';
}

// Günlük sağlık verilerini yükle
function loadDailyHealthData() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.healthData) return;
  
  const today = new Date().toDateString();
  
  // Uyku kalitesi
  const todaySleep = userData.healthData.sleepQuality.find(s => 
    new Date(s.date).toDateString() === today
  );
  const sleepElement = document.getElementById('today-sleep');
  if (sleepElement) {
    sleepElement.textContent = todaySleep ? todaySleep.value : '-';
  }
  
  // Adım sayısı
  const todaySteps = userData.healthData.stepCount.find(s => 
    new Date(s.date).toDateString() === today
  );
  const stepsElement = document.getElementById('today-steps');
  if (stepsElement) {
    stepsElement.textContent = todaySteps ? todaySteps.value : '0';
  }
  
  // Kalp atış hızı
  const todayHeartRate = userData.healthData.heartRate.find(h => 
    new Date(h.date).toDateString() === today
  );
  const heartRateElement = document.getElementById('today-heart-rate');
  if (heartRateElement) {
    heartRateElement.textContent = todayHeartRate ? todayHeartRate.value : '-';
  }
  
  // Su içimi
  updateWaterProgress();
}

// Hedefleri yükle
function loadGoals() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.goals) return;
  
  // Aktif hedefler
  const activeGoalsList = document.getElementById('active-goals-list');
  const allActiveGoals = [...userData.goals.shortTerm, ...userData.goals.longTerm];
  
  if (activeGoalsList) {
    if (allActiveGoals.length === 0) {
      activeGoalsList.innerHTML = '<p>Henüz aktif hedef yok</p>';
    } else {
      activeGoalsList.innerHTML = allActiveGoals.map(goal => `
        <div class="goal-item">
          <div class="goal-header">
            <div class="goal-title">${goal.title}</div>
            <div class="goal-progress">${goal.progress.toFixed(1)}%</div>
          </div>
          <div class="goal-description">${goal.description}</div>
          <div class="goal-target">${goal.current} / ${goal.target} ${goal.unit}</div>
          <div class="goal-deadline">Bitiş: ${new Date(goal.deadline).toLocaleDateString('tr-TR')}</div>
        </div>
      `).join('');
    }
  }
  
  // Tamamlanan hedefler
  const completedGoalsList = document.getElementById('completed-goals-list');
  if (completedGoalsList) {
    if (userData.goals.completed.length === 0) {
      completedGoalsList.innerHTML = '<p>Henüz tamamlanan hedef yok</p>';
    } else {
      completedGoalsList.innerHTML = userData.goals.completed.map(goal => `
        <div class="goal-item completed">
          <div class="goal-header">
            <div class="goal-title">✅ ${goal.title}</div>
            <div class="goal-completed-date">${new Date(goal.completedAt).toLocaleDateString('tr-TR')}</div>
          </div>
          <div class="goal-description">${goal.description}</div>
        </div>
      `).join('');
    }
  }
}

// İlerleme fotoğraflarını yükle
function loadProgressPhotos() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  if (!userData.media) return;
  
  const gallery = document.getElementById('progress-photos-gallery');
  if (gallery) {
    if (userData.media.progressPhotos.length === 0) {
      gallery.innerHTML = '<p>Henüz fotoğraf yok</p>';
    } else {
      gallery.innerHTML = userData.media.progressPhotos.map(photo => `
        <div class="photo-item">
          <img src="${photo.url}" alt="İlerleme fotoğrafı" class="progress-photo">
          <div class="photo-info">
            <div class="photo-type">${photo.type === 'before' ? 'Öncesi' : photo.type === 'after' ? 'Sonrası' : 'İlerleme'}</div>
            <div class="photo-date">${new Date(photo.date).toLocaleDateString('tr-TR')}</div>
            <div class="photo-description">${photo.description}</div>
          </div>
        </div>
      `).join('');
    }
  }
}

// Liderlik tablosunu yükle
function loadLeaderboard() {
  const leaderboard = updateLeaderboard();
  const leaderboardList = document.getElementById('leaderboard-list');
  
  if (leaderboardList) {
    if (leaderboard.length === 0) {
      leaderboardList.innerHTML = '<p>Henüz liderlik verisi yok</p>';
    } else {
      leaderboardList.innerHTML = leaderboard.map((user, index) => `
        <div class="leaderboard-item">
          <div class="rank">#${index + 1}</div>
          <div class="user-info">
            <div class="username">${user.username}</div>
            <div class="user-stats">${user.totalWorkouts} spor • ${user.achievements} başarı</div>
          </div>
          <div class="user-score">🔥 ${user.totalCalories}</div>
        </div>
      `).join('');
    }
  }
  
  // Kişisel sıralama
  const currentUser = getCurrentUser();
  const userRank = leaderboard.findIndex(user => user.userId === currentUser.id);
  const myRanking = document.getElementById('my-ranking');
  
  if (myRanking) {
    if (userRank === -1) {
      myRanking.innerHTML = '<p>Henüz sıralamada değilsiniz</p>';
    } else {
      const user = leaderboard[userRank];
      myRanking.innerHTML = `
        <div class="my-ranking-item">
          <div class="rank">#${userRank + 1}</div>
          <div class="user-info">
            <div class="username">${user.username}</div>
            <div class="user-stats">${user.totalWorkouts} spor • ${user.achievements} başarı</div>
          </div>
          <div class="user-score">🔥 ${user.totalCalories}</div>
        </div>
      `;
    }
  }
}

// AI analizlerini yükle
function loadAiAnalytics() {
  const user = getCurrentUser();
  
  // Performans tahmini
  const performancePrediction = predictPerformance(user.id);
  const predictionElement = document.getElementById('performance-prediction');
  if (predictionElement && performancePrediction) {
    predictionElement.innerHTML = `
      <div class="prediction-content">
        <h5>Gelecek Hafta Tahmini</h5>
        <div class="prediction-stats">
          <div class="prediction-stat">
            <span class="stat-label">Tahmini Spor:</span>
            <span class="stat-value">${performancePrediction.estimatedWorkouts.toFixed(1)}</span>
          </div>
          <div class="prediction-stat">
            <span class="stat-label">Tahmini Kalori:</span>
            <span class="stat-value">${performancePrediction.estimatedCalories.toFixed(0)}</span>
          </div>
          <div class="prediction-stat">
            <span class="stat-label">Tahmini Süre:</span>
            <span class="stat-value">${performancePrediction.estimatedDuration.toFixed(0)} dk</span>
          </div>
        </div>
        <div class="confidence-level">Güven: ${performancePrediction.confidence === 'high' ? 'Yüksek' : performancePrediction.confidence === 'medium' ? 'Orta' : 'Düşük'}</div>
      </div>
    `;
  }
  
  // Yaralanma riski analizi
  const injuryRisk = analyzeInjuryRisk(user.id);
  const riskElement = document.getElementById('injury-risk-analysis');
  if (riskElement && injuryRisk) {
    const riskColors = {
      low: '#1DB954',
      medium: '#ffa500',
      high: '#dc3545'
    };
    
    riskElement.innerHTML = `
      <div class="risk-content">
        <div class="risk-level" style="color: ${riskColors[injuryRisk.riskLevel]}">
          Risk Seviyesi: ${injuryRisk.riskLevel === 'low' ? 'Düşük' : injuryRisk.riskLevel === 'medium' ? 'Orta' : 'Yüksek'}
        </div>
        <div class="risk-factors">
          <h6>Risk Faktörleri:</h6>
          <ul>
            ${injuryRisk.factors.map(factor => `<li>${factor}</li>`).join('')}
          </ul>
        </div>
        <div class="risk-recommendations">
          <h6>Öneriler:</h6>
          <ul>
            ${injuryRisk.recommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }
  
  // Beslenme önerileri
  const nutritionRecommendations = generateNutritionRecommendations(user.id);
  const nutritionElement = document.getElementById('nutrition-recommendations');
  if (nutritionElement) {
    if (nutritionRecommendations.length === 0) {
      nutritionElement.innerHTML = '<p>Şu anda özel beslenme önerisi yok</p>';
    } else {
      nutritionElement.innerHTML = nutritionRecommendations.map(rec => `
        <div class="recommendation-item">
          <div class="recommendation-type">${rec.type === 'protein' ? '🥩 Protein' : rec.type === 'calories' ? '🔥 Kalori' : '💧 Hidrasyon'}</div>
          <div class="recommendation-message">${rec.message}</div>
          <div class="recommendation-foods">
            <strong>Önerilen:</strong> ${rec.foods.join(', ')}
          </div>
        </div>
      `).join('');
    }
  }
  
  // Spor programı optimizasyonu
  const optimizationElement = document.getElementById('workout-optimization');
  if (optimizationElement) {
    const userData = getUserData(user.id);
    const aiPlan = userData.aiPlan;
    
    if (aiPlan) {
      optimizationElement.innerHTML = `
        <div class="optimization-content">
          <h5>Mevcut Program Optimizasyonu</h5>
          <div class="optimization-suggestions">
            <div class="suggestion">
              <strong>Hedef:</strong> ${aiPlan.hedefText}
            </div>
            <div class="suggestion">
              <strong>Önerilen Süre:</strong> ${aiPlan.sporSuresi} dakika
            </div>
            <div class="suggestion">
              <strong>Önerilen Sıklık:</strong> Haftada ${aiPlan.hedef === 'weight_loss' ? '4-5' : aiPlan.hedef === 'muscle_gain' ? '3-4' : '3-5'} gün
            </div>
            <div class="suggestion">
              <strong>Dinlenme:</strong> Kas grupları arasında 48-72 saat
            </div>
          </div>
        </div>
      `;
    } else {
      optimizationElement.innerHTML = '<p>AI planı oluşturulmamış. Önce AI planlamasından kişisel planınızı oluşturun.</p>';
    }
  }
}

// Veri dışa aktarma
function exportUserData() {
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  const dataStr = JSON.stringify(userData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `fitbro_data_${user.username}_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  showNotification('📤 Veriler dışa aktarıldı');
}

// Verileri temizleme
function clearUserData() {
  if (confirm('⚠️ Tüm verileriniz silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?')) {
    const user = getCurrentUser();
    localStorage.removeItem(`userData_${user.id}`);
    
    showNotification('🗑️ Tüm veriler temizlendi');
    
    // Sayfayı yenile
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}

// Reklam Yönetimi Sistemi
class AdManager {
  constructor() {
    this.adContainers = [];
    this.isPremium = false;
    this.adSenseEnabled = false;
    this.init();
  }

  init() {
    this.checkPremiumStatus();
    this.setupAdContainers();
    this.loadAds();
  }

  // Premium durumunu kontrol et
  checkPremiumStatus() {
    const user = getCurrentUser();
    if (user) {
      const userData = getUserData(user.id);
      this.isPremium = userData.premium?.isPremium || false;
    }
  }

  // Reklam container'larını ayarla
  setupAdContainers() {
    this.adContainers = [
      { id: 'ad-container-1', type: 'banner' },
      { id: 'ad-container-2', type: 'banner' }
    ];
  }

  // Reklamları yükle
  loadAds() {
    if (this.isPremium) {
      this.hideAllAds();
      return;
    }

    this.adContainers.forEach(container => {
      this.loadAd(container);
    });
  }

  // Tekil reklam yükle
  loadAd(container) {
    const adElement = document.getElementById(container.id);
    if (!adElement) return;

    // Yükleme animasyonu
    adElement.classList.add('loading');

    // Gerçek reklam yükleme (Google AdSense)
    if (this.adSenseEnabled && window.adsbygoogle) {
      this.loadAdSenseAd(adElement, container);
    } else {
      // Placeholder reklam göster
      this.showPlaceholderAd(adElement);
    }
  }

  // Google AdSense reklamı yükle
  loadAdSenseAd(adElement, container) {
    try {
      // AdSense reklam kodu
      const adCode = `
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      `;

      adElement.innerHTML = adCode;
      adElement.classList.add('real-ad');
      adElement.classList.remove('loading');

      // AdSense yükleme kontrolü
      setTimeout(() => {
        if (adElement.querySelector('.adsbygoogle')) {
          adElement.classList.remove('loading');
        } else {
          this.showPlaceholderAd(adElement);
        }
      }, 3000);

    } catch (error) {
      console.log('AdSense yükleme hatası:', error);
      this.showPlaceholderAd(adElement);
    }
  }

  // Placeholder reklam göster
  showPlaceholderAd(adElement) {
    adElement.classList.remove('loading');
    adElement.classList.remove('real-ad');
    
    // Placeholder zaten HTML'de var, sadece görünür yap
    adElement.style.display = 'block';
  }

  // Tüm reklamları gizle (Premium kullanıcılar için)
  hideAllAds() {
    this.adContainers.forEach(container => {
      const adElement = document.getElementById(container.id);
      if (adElement) {
        adElement.classList.add('premium-hidden');
      }
    });
  }

  // Tüm reklamları göster (Premium iptal edildiğinde)
  showAllAds() {
    this.adContainers.forEach(container => {
      const adElement = document.getElementById(container.id);
      if (adElement) {
        adElement.classList.remove('premium-hidden');
      }
    });
    this.loadAds();
  }

  // Premium durumu değiştiğinde reklamları güncelle
  updateAdVisibility() {
    this.checkPremiumStatus();
    if (this.isPremium) {
      this.hideAllAds();
    } else {
      this.showAllAds();
    }
  }

  // AdSense'i etkinleştir
  enableAdSense() {
    this.adSenseEnabled = true;
    this.loadAds();
    showNotification('📢 AdSense reklamları etkinleştirildi');
  }

  // AdSense'i devre dışı bırak
  disableAdSense() {
    this.adSenseEnabled = false;
    this.loadAds();
    showNotification('📢 AdSense reklamları devre dışı bırakıldı');
  }

  // Reklam istatistiklerini al
  getAdStats() {
    return {
      totalAds: this.adContainers.length,
      premiumUsers: this.isPremium ? 1 : 0,
      adSenseEnabled: this.adSenseEnabled,
      adsHidden: this.isPremium ? this.adContainers.length : 0
    };
  }
}

// Global reklam yöneticisi
let adManager;

// Premium yükseltme modalını göster
function showPremiumUpgrade() {
  const modal = document.createElement('div');
  modal.className = 'premium-modal';
  modal.innerHTML = `
    <div class="premium-modal-content">
      <div class="premium-modal-header">
        <h2>🌟 Premium'a Yükselt</h2>
        <button class="close-btn" onclick="closePremiumModal()">×</button>
      </div>
      <div class="premium-modal-body">
        <div class="premium-features">
          <h3>Premium Özellikler:</h3>
          <ul>
            <li>🚫 Reklamsız deneyim</li>
            <li>📊 Detaylı analiz raporları</li>
            <li>🎯 Kişisel antrenör desteği</li>
            <li>🍎 Özel beslenme planları</li>
            <li>📹 Video konsültasyon</li>
            <li>💾 Sınırsız veri yedekleme</li>
            <li>🎨 Özel temalar</li>
            <li>📱 Öncelikli destek</li>
          </ul>
        </div>
        <div class="premium-pricing">
          <div class="price-card">
            <h4>💎 Aylık Premium</h4>
            <div class="price">₺29.99<span>/ay</span></div>
            <button class="upgrade-btn" onclick="upgradeToPremium('monthly')">Aylık Plan Seç</button>
          </div>
          <div class="price-card featured">
            <div class="popular-badge">En Popüler</div>
            <h4>💎 Yıllık Premium</h4>
            <div class="price">₺199.99<span>/yıl</span></div>
            <div class="savings">%44 Tasarruf!</div>
            <button class="upgrade-btn" onclick="upgradeToPremium('yearly')">Yıllık Plan Seç</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Modal animasyonu
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

// Premium modalını kapat
function closePremiumModal() {
  const modal = document.querySelector('.premium-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// Premium'a yükselt
function upgradeToPremium(plan) {
  const user = getCurrentUser();
  if (!user) {
    showNotification('⚠️ Lütfen önce giriş yapın!');
    return;
  }

  // Burada gerçek ödeme sistemi entegre edilecek
  // Şimdilik simüle ediyoruz
  showNotification('💳 Ödeme sayfasına yönlendiriliyorsunuz...');
  
  setTimeout(() => {
    // Premium durumunu güncelle
    const userData = getUserData(user.id);
    if (!userData.premium) {
      initializeAdvancedUserData(user.id);
    }
    
    userData.premium.isPremium = true;
    userData.premium.subscriptionDate = new Date().toISOString();
    userData.premium.plan = plan;
    userData.premium.features = [
      'ad_free',
      'detailed_analytics',
      'personal_trainer',
      'custom_nutrition',
      'video_consultation',
      'unlimited_backup',
      'custom_themes',
      'priority_support'
    ];
    
    saveUserData(user.id, userData);
    
    // Reklamları gizle
    if (adManager) {
      adManager.updateAdVisibility();
    }
    
    showNotification('🎉 Premium üyeliğiniz aktif! Reklamlar kaldırıldı.');
    closePremiumModal();
    
    // UI'ı güncelle
    updatePremiumUI();
  }, 2000);
}

// Premium UI'ını güncelle
function updatePremiumUI() {
  const user = getCurrentUser();
  if (!user) return;
  
  const userData = getUserData(user.id);
  const isPremium = userData.premium?.isPremium || false;
  
  // Premium badge'leri göster/gizle
  const premiumBadges = document.querySelectorAll('.premium-badge');
  premiumBadges.forEach(badge => {
    badge.style.display = isPremium ? 'inline' : 'none';
  });
  
  // Premium özellikleri etkinleştir/devre dışı bırak
  const premiumFeatures = document.querySelectorAll('.premium-feature');
  premiumFeatures.forEach(feature => {
    if (isPremium) {
      feature.classList.remove('disabled');
      feature.classList.add('enabled');
    } else {
      feature.classList.add('disabled');
      feature.classList.remove('enabled');
    }
  });
}

// Premium özellik kontrolü
function checkPremiumFeature(feature) {
  const user = getCurrentUser();
  if (!user) return false;
  
  const userData = getUserData(user.id);
  return userData.premium?.isPremium && userData.premium.features?.includes(feature);
}

// Premium özellik kullanımı
function usePremiumFeature(feature, callback) {
  if (checkPremiumFeature(feature)) {
    if (callback) callback();
    return true;
  } else {
    showNotification('🔒 Bu özellik Premium üyelik gerektirir');
    showPremiumUpgrade();
    return false;
  }
}

// Reklam yöneticisini başlat
document.addEventListener('DOMContentLoaded', function() {
  adManager = new AdManager();
  
  // Premium UI'ını güncelle
  updatePremiumUI();
  
  // Premium özelliklerini kontrol et
  setupPremiumFeatureChecks();
});

// Premium özellik kontrollerini ayarla
function setupPremiumFeatureChecks() {
  // PDF rapor özelliği
  const pdfReportBtn = document.querySelector('[onclick="showPanel(\'pdf-report\')"]');
  if (pdfReportBtn) {
    pdfReportBtn.onclick = function() {
      usePremiumFeature('detailed_analytics', () => showPanel('pdf-report'));
    };
  }
  
  // Detaylı istatistikler
  const statisticsBtn = document.querySelector('[onclick="showPanel(\'statistics\')"]');
  if (statisticsBtn) {
    statisticsBtn.onclick = function() {
      usePremiumFeature('detailed_analytics', () => showPanel('statistics'));
    };
  }
  
  // Kişisel antrenör
  const personalTrainerBtn = document.querySelector('[onclick="showPanel(\'personal-trainer\')"]');
  if (personalTrainerBtn) {
    personalTrainerBtn.onclick = function() {
      usePremiumFeature('personal_trainer', () => showPanel('personal-trainer'));
    };
  }
}

// AdSense'i aç/kapat
function toggleAdSense() {
  if (!adManager) return;
  
  if (adManager.adSenseEnabled) {
    adManager.disableAdSense();
  } else {
    adManager.enableAdSense();
  }
  
  // Buton metnini güncelle
  const toggleBtn = document.getElementById('adsense-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = adManager.adSenseEnabled ? '🔴 AdSense\'i Kapat' : '🟢 AdSense\'i Aç';
  }
  
  // AdSense durumunu localStorage'a kaydet
  localStorage.setItem('adsense_enabled', adManager.adSenseEnabled);
}

// Reklam istatistiklerini göster
function showAdStats() {
  if (!adManager) return;
  
  const stats = adManager.getAdStats();
  const user = getCurrentUser();
  const userData = getUserData(user.id);
  
  const modal = document.createElement('div');
  modal.className = 'premium-modal';
  modal.innerHTML = `
    <div class="premium-modal-content">
      <div class="premium-modal-header">
        <h2>📊 Reklam İstatistikleri</h2>
        <button class="close-btn" onclick="closeAdStatsModal()">×</button>
      </div>
      <div class="premium-modal-body">
        <div class="ad-stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📢</div>
            <div class="stat-value">${stats.totalAds}</div>
            <div class="stat-label">Toplam Reklam Alanı</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💎</div>
            <div class="stat-value">${userData.premium?.isPremium ? 'Evet' : 'Hayır'}</div>
            <div class="stat-label">Premium Kullanıcı</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔗</div>
            <div class="stat-value">${stats.adSenseEnabled ? 'Aktif' : 'Pasif'}</div>
            <div class="stat-label">AdSense Durumu</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🚫</div>
            <div class="stat-value">${stats.adsHidden}</div>
            <div class="stat-label">Gizlenen Reklam</div>
          </div>
        </div>
        
        <div class="ad-recommendations">
          <h3>💡 Öneriler</h3>
          <ul>
            <li>Premium kullanıcılar reklam görmez</li>
            <li>AdSense aktifken gerçek reklamlar gösterilir</li>
            <li>Placeholder reklamlar premium yükseltme için kullanılır</li>
            <li>Reklam gelirleri uygulama geliştirmeye destek olur</li>
          </ul>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

// Reklam istatistik modalını kapat
function closeAdStatsModal() {
  const modal = document.querySelector('.premium-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// AdSense durumunu localStorage'dan yükle
function loadAdSenseSettings() {
  const adSenseEnabled = localStorage.getItem('adsense_enabled') === 'true';
  if (adManager) {
    if (adSenseEnabled) {
      adManager.enableAdSense();
    } else {
      adManager.disableAdSense();
    }
  }
}

// Reklam yöneticisini başlat
document.addEventListener('DOMContentLoaded', function() {
  adManager = new AdManager();
  
  // AdSense ayarlarını yükle
  loadAdSenseSettings();
  
  // Premium UI'ını güncelle
  updatePremiumUI();
  
  // Premium özelliklerini kontrol et
  setupPremiumFeatureChecks();
});