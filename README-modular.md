# CV Website - Modular Structure

## 📁 Cấu trúc thư mục

```
thichuong.github.io/
├── index.html              # File HTML gốc (monolithic)
├── index-modular.html      # File HTML mới (modular)
├── style.css              # CSS styles
├── script.js              # JavaScript gốc (deprecated)
├── data/
│   └── cv-data.js         # Dữ liệu CV (personal info, skills, projects, etc.)
└── components/
    ├── contact.js         # Component liên hệ
    ├── skills.js          # Component kỹ năng
    ├── education.js       # Component học vấn & chứng chỉ
    ├── experience.js      # Component kinh nghiệm
    ├── summary.js         # Component giới thiệu
    ├── projects.js        # Component dự án
    ├── component-manager.js # Quản lý tất cả components
    └── ui-manager.js      # Quản lý interactions & animations
```

## 🚀 Cách sử dụng

### Phát triển với cấu trúc mới (Recommended)
Sử dụng `index-modular.html` để phát triển:

```bash
# Mở file trong browser
open index-modular.html
```

### Cập nhật nội dung CV

1. **Cập nhật thông tin cá nhân**: Chỉnh sửa file `data/cv-data.js`
2. **Thêm/sửa projects**: Cập nhật mảng `projects` trong `cv-data.js`
3. **Thêm skills mới**: Cập nhật object `skills` trong `cv-data.js`
4. **Thay đổi layout**: Chỉnh sửa các component trong thư mục `components/`

## 🔧 Cách thêm tính năng mới

### 1. Thêm section mới
```javascript
// Tạo file components/new-section.js
class NewSectionComponent {
    constructor(data) {
        this.data = data;
    }
    
    render() {
        return `<section id="new-section">...</section>`;
    }
}
```

### 2. Cập nhật component manager
```javascript
// Trong components/component-manager.js
this.components.newSection = new NewSectionComponent(this.data.newSection);
```

### 3. Thêm dữ liệu
```javascript
// Trong data/cv-data.js
const CVData = {
    // ... existing data
    newSection: {
        // new section data
    }
};
```

## 📱 Responsive Design

CSS đã được tối ưu cho:
- 📱 Mobile (< 640px)
- 📱 Tablet (640px - 992px) 
- 💻 Desktop (> 992px)

## 🎨 Themes

Hỗ trợ 2 themes:
- ☀️ Light theme (default)
- 🌙 Dark theme

Theme được lưu trong localStorage.

## ⚡ Performance

### Tối ưu hóa:
- ✅ Lazy loading animations
- ✅ Efficient DOM manipulation  
- ✅ Modular architecture
- ✅ Reusable components

### Bundle size:
- Data: ~2KB
- Components: ~15KB total
- UI Manager: ~8KB

## 🧩 Components

### ContactComponent
- Hiển thị thông tin liên hệ
- Auto-generate mailto links
- Icon integration

### SkillsComponent  
- Progress bars với animation
- Skill categories với level indicators
- Responsive skill tags

### ProjectsComponent
- Dynamic project cards
- Tech stack badges
- Project status indicators
- Multiple link types (GitHub, Demo, Live)

### UIManager
- Theme switching
- Scroll animations
- Particle canvas effects
- Typing effects

## 🔄 Migration

Để chuyển từ `index.html` sang `index-modular.html`:

1. Copy `index-modular.html` thành `index.html`
2. Xóa `script.js` cũ
3. Test tất cả tính năng

## 🐛 Debugging

### Common issues:
1. **Components không render**: Kiểm tra console errors
2. **Animations không hoạt động**: Đảm bảo UI Manager load sau components
3. **Data không hiển thị**: Kiểm tra CVData object trong cv-data.js

### Development tools:
```javascript
// Debug components
console.log(componentManager.components);

// Debug data
console.log(CVData);

// Check if UI Manager initialized
console.log(window.uiManager);
```

## 📈 Tương lai

### Planned features:
- [ ] Contact form integration
- [ ] Blog section component
- [ ] Multi-language support
- [ ] Print-friendly version
- [ ] PDF export functionality
- [ ] Analytics integration

### Technical improvements:
- [ ] TypeScript conversion
- [ ] Modern build system (Vite/Webpack)
- [ ] Component testing
- [ ] CI/CD pipeline
