# 🚀 HOW TO RUN - SIMPLE STEPS

## ✅ IT'S ALREADY RUNNING!

The server is currently active. Just open your browser!

## 🎯 STEP 1: Open Your Browser

Copy and paste this URL:
```
http://localhost:3000/app
```

Or click here if reading in browser: [http://localhost:3000/app](http://localhost:3000/app)

## 🎬 STEP 2: Start the Camera

1. Click the **"🎬 START CAMERA"** button
2. Your browser will ask for camera permission
3. Click **"Allow"** or **"Yes"**
4. Camera will start immediately!

## 🎨 STEP 3: Try Different Modes

Click these buttons to see different effects:
- **📷 RAW** - Normal camera view
- **⚫ GRAYSCALE** - Black and white
- **✨ EDGES** - Edge detection (most impressive!)

## 📊 STEP 4: Watch the Stats

Look at the stats panel:
- **FPS** - Should show 30-60 (higher is better)
- **Resolution** - Shows camera resolution
- **Mode** - Current processing mode
- **Processing Time** - How fast each frame processes

---

## 🔧 IF SERVER IS NOT RUNNING

If you see "Can't connect" or "Server not found":

### Option 1: Quick Start (Recommended)
```bash
cd web
npm start
```

### Option 2: Manual Start
```bash
cd web
npm run build
node dist/server.js
```

Then open: http://localhost:3000/app

---

## ❌ TROUBLESHOOTING

### Problem: "Camera not working"
**Solution:**
1. Make sure you clicked "Allow" for camera permission
2. Check if another app is using your camera (close Zoom, Teams, etc.)
3. Try a different browser (Chrome works best)
4. Reload the page (F5 or Ctrl+R)

### Problem: "Can't connect to localhost"
**Solution:**
1. Check if server is running (see terminal)
2. Run: `cd web` then `npm start`
3. Wait for "🚀 Web viewer running" message
4. Then open http://localhost:3000/app

### Problem: "Low FPS (below 15)"
**Solution:**
1. Close other browser tabs
2. Close other applications
3. Use Chrome browser (fastest)
4. Make sure you're not recording screen

### Problem: "No edge detection visible"
**Solution:**
1. Make sure you clicked "✨ EDGES" button
2. Point camera at objects with clear edges (books, phones, hands)
3. Ensure good lighting in room
4. Move closer to objects

### Problem: "Page not loading"
**Solution:**
1. Check terminal for errors
2. Make sure you're in the `web` folder
3. Run `npm install` first if needed
4. Then run `npm start`

---

## 📋 COMPLETE SETUP (If Starting Fresh)

### First Time Setup:
```bash
# 1. Go to web folder
cd web

# 2. Install dependencies (only needed once)
npm install

# 3. Build TypeScript
npm run build

# 4. Start server
npm start
```

### Every Time After:
```bash
cd web
npm start
```

Then open: http://localhost:3000/app

---

## 🎯 QUICK CHECKLIST

Before opening the app, make sure:
- [ ] Terminal shows "🚀 Web viewer running"
- [ ] You see "http://localhost:3000" in terminal
- [ ] No error messages in terminal
- [ ] You're using Chrome, Firefox, or Edge browser

When opening the app:
- [ ] URL is exactly: http://localhost:3000/app
- [ ] Page loads (you see the interface)
- [ ] Click "Start Camera" button
- [ ] Allow camera permission
- [ ] Camera feed appears

---

## 🌐 BROWSER COMPATIBILITY

✅ **Best Performance:**
- Google Chrome
- Microsoft Edge
- Brave

✅ **Good Performance:**
- Firefox
- Opera

⚠️ **May Need HTTPS:**
- Safari (use Chrome instead)

---

## 💡 PRO TIPS

### For Best Experience:
1. **Use Chrome** - Fastest performance
2. **Good lighting** - Better edge detection
3. **Close other tabs** - More FPS
4. **Point at objects** - See clear edges
5. **Try all modes** - Each looks different

### Cool Things to Try:
- ✨ Wave your hand in Edges mode
- ✨ Hold a book - see rectangular edges
- ✨ Show your face - see facial features
- ✨ Move objects - edges follow in real-time
- ✨ Check FPS counter - should be 30-60

---

## 🎬 DEMO SCRIPT

Perfect for showing others:

1. **Open app** - "This is a real-time edge detection system"
2. **Start camera** - "It uses your webcam"
3. **Show Raw** - "Here's the normal camera feed"
4. **Switch to Edges** - "Now watch this..." [switch mode]
5. **Move hand** - "It detects edges in real-time at 60 FPS"
6. **Point to stats** - "Processing each frame in under 20ms"

---

## 📱 MOBILE VERSION

Want to try on your phone?

1. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` (look for inet)

2. On your phone's browser, go to:
   ```
   http://[YOUR-IP]:3000/app
   ```
   Example: http://192.168.1.100:3000/app

3. Use your phone's camera!

---

## 🛑 HOW TO STOP

To stop the server:
1. Go to terminal where server is running
2. Press `Ctrl + C`
3. Server will stop

To start again:
```bash
cd web
npm start
```

---

## 📞 STILL NEED HELP?

### Check These:
1. **Terminal output** - Any error messages?
2. **Browser console** - Press F12, check Console tab
3. **Camera permission** - Check browser settings
4. **Port 3000** - Make sure nothing else uses it

### Common Error Messages:

**"EADDRINUSE: port 3000 already in use"**
- Solution: Stop other server or use different port

**"Cannot find module"**
- Solution: Run `npm install` in web folder

**"Permission denied"**
- Solution: Run as administrator or check file permissions

---

## ✅ SUCCESS INDICATORS

You know it's working when:
- ✅ Terminal shows "🚀 Web viewer running"
- ✅ Browser shows the app interface
- ✅ Camera button is clickable
- ✅ Camera feed appears after clicking
- ✅ FPS counter shows 30-60
- ✅ Mode buttons switch effects
- ✅ Stats update in real-time

---

## 🎉 THAT'S IT!

**Just open http://localhost:3000/app and click Start Camera!**

The server is already running. You're ready to go! 🚀
