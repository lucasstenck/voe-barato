# 🛫 PLATAFORMA DE MONITORAMENTO DE PASSAGENS AÉREAS - MVP COMPLETO

## 📋 **DESCRIÇÃO GERAL DO PROJETO**

Esta é uma **plataforma completa MVP (Produto Mínimo Viável)** para monitoramento inteligente de passagens aéreas, desenvolvida como projeto de aprendizado e prática de desenvolvimento fullstack moderno.

### 🎯 **Objetivos do Projeto:**
- **Aprendizado**: Prática completa de desenvolvimento fullstack
- **Funcional**: Sistema totalmente funcional e testável
- **Moderno**: Tecnologias atuais e melhores práticas
- **Escalável**: Arquitetura bem estruturada e modular

### 🚀 **Funcionalidades Principais:**
- ✅ **Cadastro e Login** de usuários com autenticação JWT
- ✅ **Busca de Voos** com dados mockados realistas
- ✅ **Sistema de Alertas** para monitoramento de preços
- ✅ **Histórico de Buscas** do usuário
- ✅ **Inteligência Artificial** para previsão de preços
- ✅ **Notificações Push** locais simuladas
- ✅ **Interface Mobile** responsiva e intuitiva

---

## 🛠️ **STACK TECNOLÓGICO DETALHADO**

### **BACKEND (Python/FastAPI)**
```json
{
  "Framework Principal": "FastAPI 0.104.1",
  "Linguagem": "Python 3.11",
  "Servidor ASGI": "Uvicorn 0.24.0",
  "Banco de Dados": "SQLite (arquivo local)",
  "ORM": "SQLAlchemy 2.0.23 + Pydantic 2.5.0",
  "Autenticação": "JWT (python-jose 3.3.0)",
  "Hashing": "bcrypt (passlib 1.7.4)",
  "IA/ML": {
    "scikit-learn": "1.3.2",
    "pandas": "2.1.4",
    "joblib": "1.3.2"
  },
  "Validação": "Pydantic + email-validator 2.1.0",
  "Migrações": "Alembic 1.12.1"
}
```

### **FRONTEND (React Native/Expo)**
```json
{
  "Framework": "React Native 0.76.5",
  "Expo SDK": "53.0.22",
  "React": "18.2.0",
  "TypeScript": "5.8.3",
  "UI Framework": "React Native Paper 5.12.3",
  "Navegação": "React Navigation 6.x",
  "HTTP Client": "Axios 1.7.9",
  "Notificações": "Expo Notifications 0.32.2",
  "Armazenamento Seguro": "Expo Secure Store 14.0.1",
  "Async Storage": "2.1.0"
}
```

### **INFRAESTRUTURA**
```json
{
  "Containerização": "Docker + Docker Compose",
  "Sistema Operacional": "Compatível Windows/Linux/Mac",
  "Desenvolvimento": "Hot Reload (backend e frontend)",
  "Banco": "SQLite (desenvolvimento) / PostgreSQL (produção)"
}
```

---

## 🚀 **GUIA COMPLETO DE EXECUÇÃO**

### **📋 Pré-requisitos:**
- ✅ **Docker** e **Docker Compose** instalados
- ✅ **Node.js** 18+ instalado
- ✅ **Expo CLI** global: `npm install -g @expo/cli`
- ✅ **Expo Go** no celular (versão 2.33.21+)

### **🔧 Passo a Passo:**

#### **1. Clonagem e Preparação**
```bash
git clone <url-do-repositorio>
cd passagem
```

#### **1.5. Scripts de Inicialização (Windows)**
```bash
# Para iniciar apenas o backend:
start-project.bat

# Para iniciar apenas o frontend (em outro terminal):
start-frontend.bat
```

#### **2. Inicializar Backend**
```bash
# Construir e executar container Docker
docker-compose up --build
```
✅ **Resultado esperado:** Backend rodando em `http://localhost:8000`

#### **3. Inicializar Frontend**
```bash
cd frontend
npm install --legacy-peer-deps
npx expo start
```
✅ **Resultado esperado:** QR Code aparecendo no terminal

#### **4. Testar no Celular**
1. **Abra o Expo Go** no celular (atualizado)
2. **Escaneie o QR Code** do terminal
3. **Teste todas as funcionalidades**

---

## 📁 **ESTRUTURA DETALHADA DOS ARQUIVOS**

### **📂 ESTRUTURA COMPLETA DO PROJETO:**
```
/passagem/                           # 📂 Raiz do projeto
├── backend/                        # 🐍 Backend Python/FastAPI
│   ├── app/                        # 📁 Código principal da aplicação
│   │   ├── __init__.py             # 🏗️ Inicialização do módulo
│   │   ├── main.py                 # 🚀 Ponto de entrada FastAPI
│   │   ├── database.py             # 💾 Configuração SQLAlchemy
│   │   ├── models.py               # 📊 Modelos de dados (User, Alert, etc.)
│   │   ├── schemas.py              # 📋 Schemas Pydantic (validação)
│   │   ├── crud.py                 # 🔧 Operações CRUD no banco
│   │   ├── dependencies.py         # 🔐 Autenticação JWT
│   │   └── routers/                # 🛣️ Endpoints da API
│   │       ├── auth.py             # 🔑 Autenticação (login/register)
│   │       ├── flights.py          # ✈️ Busca e previsão de voos
│   │       └── users.py            # 👤 Gerenciamento de usuários
│   ├── ai/                         # 🤖 Módulo de IA
│   │   ├── __init__.py             # 🏗️ Inicialização do módulo IA
│   │   ├── model.py                # 🧠 Lógica de ML e treinamento
│   │   └── seed_and_train.py       # 📊 Script para gerar dados e treinar
│   ├── Dockerfile                  # 🐳 Configuração Docker backend
│   ├── requirements.txt            # 📦 Dependências Python
│   └── database.sqlite             # 💾 Banco de dados local
├── frontend/                       # 📱 Frontend React Native/Expo
│   ├── assets/                     # 🖼️ Recursos estáticos
│   │   ├── icon.png                # 📱 Ícone do app
│   │   ├── splash-icon.png         # 🌊 Tela de splash
│   │   └── adaptive-icon.png       # 🔄 Ícone adaptativo
│   ├── components/                 # 🧩 Componentes reutilizáveis
│   │   ├── CustomButton.tsx        # 🔘 Botão personalizado
│   │   ├── CustomInput.tsx         # 📝 Input personalizado
│   │   └── FlightCard.tsx          # 🎫 Card de voo
│   ├── screens/                    # 📱 Telas do aplicativo
│   │   ├── Auth/                   # 🔐 Telas de autenticação
│   │   │   ├── LoginScreen.tsx     # 🚪 Tela de login
│   │   │   └── RegisterScreen.tsx  # 📝 Tela de registro
│   │   └── App/                    # 📲 Telas principais do app
│   │       ├── SearchScreen.tsx    # 🔍 Busca de voos
│   │       ├── AlertsScreen.tsx    # 🔔 Gerenciamento de alertas
│   │       ├── HistoryScreen.tsx   # 📜 Histórico de buscas
│   │       └── ProfileScreen.tsx   # 👤 Perfil do usuário
│   ├── navigation/                 # 🧭 Sistema de navegação
│   │   ├── AppNavigator.tsx        # 🗺️ Navegação principal
│   │   └── MainTabNavigator.tsx    # 📑 Navegação por abas
│   ├── services/                   # 🔧 Serviços e utilitários
│   │   ├── api.ts                  # 🌐 Cliente HTTP para API
│   │   ├── AuthContext.tsx         # 🔐 Context de autenticação
│   │   └── NotificationsService.ts # 📢 Serviço de notificações
│   ├── App.tsx                     # 🎯 Componente raiz do app
│   ├── app.json                    # ⚙️ Configuração Expo
│   ├── package.json                # 📦 Dependências Node.js
│   └── tsconfig.json               # 🔧 Configuração TypeScript
├── docker-compose.yml              # 🐳 Orquestração de serviços
├── start-project.bat               # 🚀 Script de inicialização (Windows)
├── env.example                     # 🔐 Exemplo de variáveis ambiente
└── README.md                       # 📖 Esta documentação
```

---

## 🔍 **EXPLICAÇÃO DETALHADA DOS COMPONENTES PRINCIPAIS**

### **🐍 BACKEND - Arquitetura FastAPI**

#### **`main.py`** - 🚀 **Ponto de Entrada**
```python
# Configuração principal do FastAPI
app = FastAPI(
    title="Plataforma de Monitoramento de Passagens Aéreas",
    description="API para monitoramento de preços de passagens aéreas com IA",
    version="1.0.0"
)

# Middleware CORS para comunicação com frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção: especificar domínios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusão dos routers
app.include_router(auth.router)      # /auth/*
app.include_router(flights.router)   # /flights/*
app.include_router(users.router)     # /users/*
```

#### **`models.py`** - 📊 **Modelos de Dados SQLAlchemy**
```python
class User(Base):
    """Modelo de usuário com relacionamentos"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relacionamentos One-to-Many
    alerts = relationship("Alert", back_populates="user", cascade="all, delete-orphan")
    search_history = relationship("SearchHistory", back_populates="user", cascade="all, delete-orphan")

class Alert(Base):
    """Modelo de alerta de preço"""
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    origin = Column(String(3), nullable=False)        # GRU, SDU, etc.
    destination = Column(String(3), nullable=False)   # GRU, SDU, etc.
    target_price = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_notified = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="alerts")
```

### **📱 FRONTEND - Arquitetura React Native/Expo**

#### **`App.tsx`** - 🎯 **Componente Raiz**
```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './services/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <PaperProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </PaperProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}
```

#### **`AuthContext.tsx`** - 🔐 **Context de Autenticação**
```tsx
// Contexto para gerenciamento global de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega dados de autenticação armazenados no dispositivo
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('userToken');
      const storedUser = await SecureStore.getItemAsync('userData');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        // Configura header Authorization para todas as requisições
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função de login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/token`, {
        username: email,
        password: password,
      });

      const { access_token } = response.data;
      setToken(access_token);

      // Dados mockados do usuário (em produção: buscar do backend)
      const userData = { id: 1, email: email };
      setUser(userData);

      // Armazenamento seguro dos dados
      await SecureStore.setItemAsync('userToken', access_token);
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));

      // Configura header para futuras requisições
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Demais funções (register, logout) seguem padrão similar
  // ...
};
```

---

## 🌐 **API ENDPOINTS DETALHADA**

### **🔑 AUTENTICAÇÃO**
| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| POST | `/auth/register` | Criar novo usuário | `{"email": "user@example.com", "password": "password123"}` | `{"access_token": "jwt_token", "token_type": "bearer"}` |
| POST | `/auth/token` | Autenticar usuário | `{"username": "user@example.com", "password": "password123"}` | `{"access_token": "jwt_token", "token_type": "bearer"}` |

### **✈️ VOOS E IA** (Requer Autenticação)
| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| POST | `/flights/search` | Buscar voos | `{"origin": "GRU", "destination": "SDU", "departure_date": "2024-12-25"}` | Lista de voos mockados |
| POST | `/flights/predict` | Prever preço | `{"origin": "GRU", "destination": "SDU", "days_ahead": 30}` | `{"predicted_price": 550.75, "trend": "up/down/stable"}` |

### **👤 USUÁRIO** (Requer Autenticação)
| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| GET | `/users/me/alerts` | Listar alertas | - | Lista de alertas do usuário |
| POST | `/users/me/alerts` | Criar alerta | `{"origin": "GRU", "destination": "SDU", "target_price": 500.00}` | Alerta criado |
| PUT | `/users/me/alerts/{alert_id}` | Atualizar alerta | `{"target_price": 450.00}` | Alerta atualizado |
| DELETE | `/users/me/alerts/{alert_id}` | Deletar alerta | - | Confirmação de exclusão |
| POST | `/users/me/alerts/{alert_id}/notify_test` | Testar notificação | - | Notificação enviada |
| GET | `/users/me/history` | Histórico de buscas | - | Lista de buscas realizadas |

---

## 🎯 **FUNCIONALIDADES IMPLEMENTADAS**

### **✅ SISTEMA COMPLETO FUNCIONANDO:**

#### **1. Autenticação JWT**
- ✅ Cadastro de usuários com validação de email
- ✅ Login com geração de tokens JWT
- ✅ Armazenamento seguro no dispositivo (Expo Secure Store)
- ✅ Logout com limpeza de dados
- ✅ Proteção de rotas autenticadas

#### **2. Busca de Voos**
- ✅ Interface de busca intuitiva
- ✅ Dados mockados realistas (LATAM, GOL, AZUL)
- ✅ Filtros por origem/destino/data
- ✅ Resultados em cards organizados
- ✅ Registro automático no histórico

#### **3. Sistema de Alertas**
- ✅ Criação de alertas de preço
- ✅ Listagem de alertas ativos
- ✅ Edição de alertas existentes
- ✅ Exclusão de alertas
- ✅ Notificações simuladas (Expo Notifications)

#### **4. Histórico de Buscas**
- ✅ Registro automático de todas as buscas
- ✅ Visualização cronológica
- ✅ Detalhes completos de cada busca
- ✅ Interface limpa e organizada

#### **5. Inteligência Artificial**
- ✅ Modelo de Regressão Linear treinado
- ✅ Dados sintéticos realistas (5.000 registros)
- ✅ Previsão de preços baseada em:
  - Origem/Destino
  - Dias até o voo
  - Padrões históricos
- ✅ Respostas com tendência (up/down/stable)

#### **6. Interface Mobile**
- ✅ Design responsivo com React Native Paper
- ✅ Navegação por abas (Bottom Tabs)
- ✅ Navegação autenticada (Stack)
- ✅ Componentes reutilizáveis
- ✅ Tema consistente (Material Design)

---

## 🔧 **TECNOLOGIAS E FERRAMENTAS UTILIZADAS**

### **Backend (Python/FastAPI)**
- **FastAPI**: Framework web moderno e rápido
- **SQLAlchemy**: ORM para interação com banco
- **Pydantic**: Validação de dados e schemas
- **JWT**: Autenticação segura
- **scikit-learn**: Machine Learning para previsões
- **SQLite**: Banco de dados local (desenvolvimento)

### **Frontend (React Native/Expo)**
- **Expo SDK 53**: Plataforma de desenvolvimento mobile
- **React Navigation 6**: Navegação entre telas
- **React Native Paper**: Componentes UI Material Design
- **Axios**: Cliente HTTP para API
- **Expo Secure Store**: Armazenamento seguro
- **Expo Notifications**: Sistema de notificações

### **Infraestrutura**
- **Docker**: Containerização da aplicação
- **Docker Compose**: Orquestração de serviços
- **Git**: Controle de versão

---

## 🧪 **TESTE FUNCIONAL DO SISTEMA**

### **Fluxo Completo de Teste:**

1. **📱 Abra o App** no Expo Go
2. **📝 Cadastre-se** com email e senha
3. **🔍 Busque voos** (ex: GRU → SDU)
4. **🔔 Crie um alerta** de preço
5. **📊 Veja previsões** de preço com IA
6. **📜 Verifique histórico** de buscas
7. **🔔 Teste notificações** simuladas
8. **🚪 Faça logout** e login novamente

### **APIs para Teste Manual:**
```bash
# Health check
curl http://localhost:8000/health

# Documentação automática
# Acesse: http://localhost:8000/docs
```

---

## 🎉 **PROJETO MVP 100% FUNCIONAL!**

Este projeto demonstra uma **plataforma completa** de monitoramento de passagens aéreas com:

- ✅ **Arquitetura profissional** (Backend API + Mobile App)
- ✅ **Banco de dados relacional** com relacionamentos
- ✅ **Autenticação segura** com JWT
- ✅ **Machine Learning** para previsões
- ✅ **Interface mobile** moderna e intuitiva
- ✅ **Containerização** com Docker
- ✅ **Documentação completa**
- ✅ **Código limpo e organizado**

**Perfeito para portfólio e aprendizado avançado de desenvolvimento fullstack!** 🚀

---

**📋 RESUMO EXECUTIVO:**
- **🏗️ Arquitetura**: Fullstack (Backend API + Mobile App)
- **🔧 Tecnologias**: FastAPI + React Native + SQLite + ML
- **✅ Status**: MVP 100% Funcional
- **🎯 Objetivo**: Demonstração completa de habilidades técnicas
- **📚 Documentação**: Guia detalhado para ChatGPT entender tudo

**Agora você pode enviar este README completo para o ChatGPT e ele terá todas as informações necessárias para entender perfeitamente o projeto!** 🤖✨

---

## 🎯 **RESUMO FINAL - PROJETO PRONTO!**

### **✅ O QUE FOI IMPLEMENTADO:**

#### **🐍 BACKEND (FastAPI + Python):**
- ✅ API REST completa com autenticação JWT
- ✅ Sistema de usuários (cadastro/login)
- ✅ Busca de voos com dados mockados realistas
- ✅ Sistema de alertas de preço
- ✅ Histórico de buscas do usuário
- ✅ **Inteligência Artificial integrada** (Regressão Linear)
- ✅ Modelo treinado com 5.000 registros sintéticos
- ✅ Previsões de preços baseadas em ML
- ✅ Banco SQLite com relacionamentos
- ✅ Containerização com Docker

#### **📱 FRONTEND (React Native + Expo):**
- ✅ Interface mobile completa e responsiva
- ✅ Navegação por abas (Bottom Tabs)
- ✅ Autenticação com Context API
- ✅ Componentes reutilizáveis (Material Design)
- ✅ Integração com API backend
- ✅ Armazenamento seguro (Expo Secure Store)
- ✅ Sistema de notificações push
- ✅ TypeScript configurado

#### **🔧 INFRAESTRUTURA:**
- ✅ Docker Compose para orquestração
- ✅ Scripts de inicialização (Windows)
- ✅ Configuração completa do Android
- ✅ JDK 17 configurado
- ✅ Gradle otimizado

### **🚀 COMO USAR AGORA:**

#### **Método Mais Simples (Recomendado):**
```bash
# 1. Iniciar backend
start-project.bat

# 2. Em outro terminal, iniciar frontend
start-frontend.bat
```

#### **Método Manual:**
```bash
# Terminal 1 - Backend
cd backend && docker-compose up --build

# Terminal 2 - Frontend
cd frontend && npx expo start
```

### **📱 FUNCIONALIDADES PRONTAS:**

1. **🔐 Cadastro/Login** - Autenticação completa
2. **✈️ Busca de Voos** - Interface intuitiva com dados realistas
3. **🔔 Alertas de Preço** - Sistema de notificações
4. **📜 Histórico** - Rastreamento de buscas
5. **🤖 IA Integrada** - Previsões inteligentes de preços
6. **📱 Mobile First** - Interface otimizada para mobile

### **🎉 PROJETO 100% FUNCIONAL!**

Este é um **MVP completo e profissional** que demonstra:
- ✅ **Arquitetura moderna** (Backend + Mobile)
- ✅ **Machine Learning integrado**
- ✅ **Desenvolvimento fullstack**
- ✅ **Boas práticas de código**
- ✅ **Containerização**
- ✅ **Documentação completa**

**Pronto para desenvolvimento, testes e demonstração!** 🚀✨