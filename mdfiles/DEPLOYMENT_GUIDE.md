# Complete Free Deployment Guide

## Spring Boot + React + MySQL (100% Free)

### Platforms Used:

- **Backend**: Render (Free Tier)
- **Database**: Railway (Free MySQL)
- **Frontend**: Netlify or Vercel (Free Hosting)

---

## 1. Database Deployment (Railway)

### Step 1: Create Free MySQL Instance

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Provision MySQL"**
5. Wait for MySQL instance to be created

### Step 2: Get Database Credentials

1. Click on your MySQL service
2. Go to **"Variables"** tab
3. You'll see:
   ```
   MYSQL_HOST=containers-us-west-xxx.railway.app
   MYSQL_PORT=6379
   MYSQL_USER=root
   MYSQL_PASSWORD=xxxxxxxxx
   MYSQL_DATABASE=railway
   ```

### Step 3: Configure application.properties

Update your `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}?useSSL=true&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=${MYSQL_USER}
spring.datasource.password=${MYSQL_PASSWORD}

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.generate-ddl=true

# Server Configuration
server.port=8080

# JWT Configuration
jwt.secret=bikeTaxiSecretKey12345678901234567890123456789012
jwt.expiration=86400000
jwt.header=Authorization
jwt.prefix=Bearer
```

### Common Railway MySQL Errors & Fixes

#### Error 1: SSL Connection Error

```
Solution: Add useSSL=true or useSSL=false in JDBC URL
jdbc:mysql://host:port/db?useSSL=false
```

#### Error 2: Timezone Error

```
Solution: Add serverTimezone=UTC
jdbc:mysql://host:port/db?serverTimezone=UTC
```

#### Error 3: Public Key Retrieval

```
Solution: Add allowPublicKeyRetrieval=true
jdbc:mysql://host:port/db?allowPublicKeyRetrieval=true
```

#### Error 4: Connection Timeout

```
Solution: Check Railway service is running and credentials are correct
```

---

## 2. Backend Deployment (Spring Boot on Render)

### Step 1: Prepare Your Spring Boot Project

1. Ensure you have a `pom.xml` or `build.gradle`
2. Make sure your project builds locally:
   ```bash
   mvn clean package
   ```

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 3: Deploy on Render

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Select your project

### Step 4: Configure Render Settings

#### Build Settings:

```
Name: fast-bike-backend
Environment: Java
Region: Oregon (US West)
Branch: main
Build Command: mvn clean package -DskipTests
Start Command: java -jar target/springapp-0.0.1-SNAPSHOT.jar
```

#### Environment Variables:

Add these in Render dashboard:

```
MYSQL_HOST=containers-us-west-xxx.railway.app
MYSQL_PORT=6379
MYSQL_USER=root
MYSQL_PASSWORD=your_railway_password
MYSQL_DATABASE=railway
```

#### Advanced Settings:

```
Auto-Deploy: Yes
Health Check Path: /
```

### Step 5: Fix Common Render Errors

#### Error 1: Port Already in Use

**Solution**: Render uses environment variable `PORT`. Update your `application.properties`:

```properties
server.port=${PORT:8080}
```

#### Error 2: Build Failed - Maven Not Found

**Solution**: Add `render.yaml` in root directory:

```yaml
services:
  - type: web
    name: fast-bike-backend
    env: java
    buildCommand: mvn clean package -DskipTests
    startCommand: java -jar target/springapp-0.0.1-SNAPSHOT.jar
```

#### Error 3: JAR Not Found

**Solution**: Check your `pom.xml` finalName:

```xml
<build>
    <finalName>springapp</finalName>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

Then update Start Command:

```
java -jar target/springapp.jar
```

#### Error 4: Connection Timeout

**Solution**: Increase timeout in Render dashboard or optimize your startup time.

#### Error 5: CORS Blocked Request

**Solution**: Update CORS configuration (see section below).

### Step 6: Configure CORS for Production

Update your `CorsConfiguration.java`:

```java
package com.examly.springapp.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                    "http://localhost:3000",
                    "https://your-netlify-app.netlify.app",
                    "https://your-vercel-app.vercel.app"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

Also update `WebSecurityConfig.java`:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(
        "http://localhost:3000",
        "https://your-netlify-app.netlify.app",
        "https://your-vercel-app.vercel.app"
    ));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### Your Backend URL:

After deployment, you'll get:

```
https://fast-bike-backend.onrender.com
```

---

## 3. Frontend Deployment (React on Netlify/Vercel)

### Option A: Deploy on Netlify

#### Step 1: Prepare Your React Project

Update `src/services/ApiService.js`:

```javascript
// Change API_URL to use environment variable
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Rest of your code...
```

#### Step 2: Create `.env` file in React root:

```env
REACT_APP_API_URL=https://fast-bike-backend.onrender.com
```

#### Step 3: Add `.env` to `.gitignore`:

```
.env
.env.local
.env.production
```

#### Step 4: Create `netlify.toml` in React root:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Step 5: Deploy on Netlify

1. Go to [Netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect GitHub and select your repository
5. Configure build settings:
   ```
   Base directory: reactapp
   Build command: npm run build
   Publish directory: reactapp/build
   ```

#### Step 6: Add Environment Variables in Netlify

1. Go to **Site settings** → **Environment variables**
2. Add:
   ```
   REACT_APP_API_URL = https://fast-bike-backend.onrender.com
   ```

#### Step 7: Deploy and Test

Click **"Deploy site"** and wait for build to complete.

---

### Option B: Deploy on Vercel

#### Step 1: Same React preparation as Netlify

#### Step 2: Create `vercel.json` in React root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Step 3: Deploy on Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"Add New"** → **"Project"**
4. Import your GitHub repository
5. Configure:
   ```
   Framework Preset: Create React App
   Root Directory: reactapp
   Build Command: npm run build
   Output Directory: build
   ```

#### Step 4: Add Environment Variables

1. Go to **Project Settings** → **Environment Variables**
2. Add:
   ```
   REACT_APP_API_URL = https://fast-bike-backend.onrender.com
   ```

#### Step 5: Deploy

Click **"Deploy"** and wait for completion.

---

### Common Frontend Deployment Errors

#### Error 1: 404 on Page Refresh

**Solution**: Add redirects configuration (already included in `netlify.toml` or `vercel.json` above)

#### Error 2: CORS Errors

**Solution**:

- Ensure backend CORS allows your frontend domain
- Check browser console for exact error
- Verify API_URL is correct

#### Error 3: Wrong API Base URL

**Solution**:

- Check `.env` file
- Verify `process.env.REACT_APP_API_URL` is used
- Rebuild and redeploy

#### Error 4: Mixed Content (HTTP vs HTTPS)

**Solution**:

- Always use HTTPS for backend URL
- Render provides HTTPS by default
- Update all HTTP references to HTTPS

#### Error 5: Environment Variables Not Working

**Solution**:

- React only reads `REACT_APP_*` variables
- Rebuild after changing env vars
- Clear cache and redeploy

---

## 4. Connecting Frontend & Backend

### Step 1: Update API Base URL

In `src/services/ApiService.js`:

```javascript
// ApiService.js - Production-ready version

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Helper function to get stored token
const getToken = () => localStorage.getItem("token");

// Function to handle fetch calls with authentication
const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Add authorization header if token exists
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Merge default headers with any provided headers
  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(`${API_URL}${url}`, mergedOptions);

    // If unauthorized (token expired or invalid), redirect to login
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      window.location.href = "/login";
      return null;
    }

    // Parse JSON if response is ok
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }
      return await response.text();
    }

    // Handle error responses
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Define API methods
const ApiService = {
  // Admin APIs
  adminLogin: (credentials) => {
    return fetch(`${API_URL}/adminLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((res) => res.json());
  },

  // ... rest of your API methods
};

export default ApiService;
```

### Step 2: Environment-Specific Configuration

Create three environment files:

**`.env.development`** (local):

```env
REACT_APP_API_URL=http://localhost:8080
```

**`.env.production`** (production):

```env
REACT_APP_API_URL=https://fast-bike-backend.onrender.com
```

### Step 3: Test Both Endpoints Together

1. Open browser console (F12)
2. Go to Network tab
3. Try logging in
4. Check if API calls go to correct URL
5. Verify response status codes

---

## 5. Final Testing & Verification

### Backend Testing

1. **Check Backend Health**:

   ```
   https://fast-bike-backend.onrender.com/
   ```

2. **Test Admin Login Endpoint**:

   ```bash
   curl -X POST https://fast-bike-backend.onrender.com/adminLogin \
   -H "Content-Type: application/json" \
   -d '{"username":"Romey@123","password":"Romey@123"}'
   ```

3. **Verify Database Connection**:
   - Check Render logs
   - Look for "HikariPool-1 - Start completed"
   - No connection errors

### Frontend Testing

1. **Open your deployed React app**:

   ```
   https://your-app.netlify.app
   ```

2. **Open Browser DevTools** (F12)
3. **Go to Network tab**
4. **Try logging in**
5. **Verify**:
   - API calls go to Render URL
   - Status code is 200 for success
   - Token is stored in localStorage
   - No CORS errors

### Full Workflow Test

1. **Admin Login**:

   - Go to `/login`
   - Select "Admin" tab
   - Enter: `Romey@123` / `Romey@123`
   - Should redirect to `/admin/drivers`

2. **Driver Login**:

   - Register a new driver at `/apply`
   - Login at `/login` with driver tab
   - Should redirect to `/driver/dashboard`

3. **Check All Features**:
   - View drivers list
   - Add new driver
   - Update driver
   - Delete driver
   - Contact form submission

---

## 6. Sample Folder Structure

```
Fast-Bike-and-Taxi--application/
├── reactapp/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   │   └── ApiService.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.development
│   ├── .env.production
│   ├── netlify.toml (or vercel.json)
│   ├── package.json
│   └── README.md
├── springapp/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/examly/springapp/
│   │   │   │       ├── configuration/
│   │   │   │       │   ├── AdminInitializer.java
│   │   │   │       │   ├── CorsConfiguration.java
│   │   │   │       │   └── WebSecurityConfig.java
│   │   │   │       ├── controller/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       ├── service/
│   │   │   │       └── SpringappApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   ├── render.yaml (optional)
│   └── README.md
└── README.md
```

---

## 7. Example application.properties (Production)

```properties
# Database Configuration (Railway)
spring.datasource.url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}?useSSL=true&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=${MYSQL_USER}
spring.datasource.password=${MYSQL_PASSWORD}

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.generate-ddl=true

# Server Configuration
server.port=${PORT:8080}

# JWT Configuration
jwt.secret=${JWT_SECRET:bikeTaxiSecretKey12345678901234567890123456789012}
jwt.expiration=86400000
jwt.header=Authorization
jwt.prefix=Bearer

# Logging
logging.level.org.springframework.web=INFO
logging.level.com.examly.springapp=DEBUG
```

---

## 8. Example Axios API File

```javascript
// src/services/api.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 9. Troubleshooting Common Issues

### Issue 1: Backend Not Starting on Render

**Check**:

- Build logs for errors
- Environment variables are set
- Database connection is working
- Port configuration is correct

### Issue 2: Frontend Can't Connect to Backend

**Check**:

- REACT_APP_API_URL is correct
- Backend CORS allows frontend domain
- Both apps are using HTTPS
- No typos in URLs

### Issue 3: Database Connection Fails

**Check**:

- Railway MySQL is running
- Credentials are correct
- JDBC URL format is correct
- Network connectivity

### Issue 4: JWT Token Issues

**Check**:

- Token is being stored in localStorage
- Token is being sent in Authorization header
- JWT secret is configured
- Token hasn't expired

---

## 10. Cost Breakdown (₹0)

| Service          | Plan            | Cost   |
| ---------------- | --------------- | ------ |
| Railway MySQL    | Free 500h/month | ₹0     |
| Render Backend   | Free 750h/month | ₹0     |
| Netlify Frontend | Free unlimited  | ₹0     |
| **Total**        |                 | **₹0** |

### Free Tier Limitations:

- **Railway**: 500 hours/month, services sleep after inactivity
- **Render**: 750 hours/month, services sleep after 15 min inactivity
- **Netlify**: 100GB bandwidth/month

---

## 11. Quick Deployment Checklist

- [ ] Railway MySQL created and credentials noted
- [ ] Backend `application.properties` updated with Railway DB
- [ ] Backend pushed to GitHub
- [ ] Backend deployed on Render with env vars
- [ ] Backend CORS configured for frontend domain
- [ ] Frontend `.env` updated with Render backend URL
- [ ] Frontend `netlify.toml` or `vercel.json` added
- [ ] Frontend deployed on Netlify/Vercel
- [ ] Frontend env vars set in deployment platform
- [ ] Admin user created (Romey@123)
- [ ] Tested admin login
- [ ] Tested all major features
- [ ] Checked browser console for errors
- [ ] Verified no CORS issues

---

## 12. Support Resources

- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs

---

## Congratulations! 🎉

Your full-stack application is now deployed 100% FREE with:

- ✅ MySQL Database (Railway)
- ✅ Spring Boot Backend (Render)
- ✅ React Frontend (Netlify/Vercel)
- ✅ Total Cost: ₹0

Remember: Free tier services may sleep after inactivity. First request might take 30-60 seconds to wake up the service.
