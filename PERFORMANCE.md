# CV Website Performance Optimizations

## Các tối ưu hóa đã thực hiện để giảm bớt xử lý khi tải CV:

### 1. **Tách Module và Lazy Loading**
- **CV Renderer** (`components/cv-renderer.js`): Logic render CV tập trung, hỗ trợ render template string hiệu quả.
- **Animation Manager** (`components/animation-manager.js`): Quản lý animations với Intersection Observer.
- **Canvas Animation** (`components/canvas-animation.js`): Canvas animation được tách riêng và lazy loaded.

### 2. **Kiến trúc & UX Optimization (Mới)**
- **Section-based Navigation**: Chuyển đổi từ trang cuộn dài sang mô hình SPA (Single Page Application) với các "trang" riêng biệt.
  - Giảm `Paint` workload cho trình duyệt vì chỉ hiển thị một section tại một thời điểm.
  - Loại bỏ hoàn toàn Layout Thrashing do cuộn trang dài gây ra.
  - Cải thiện trải nghiệm người dùng (UX) với chuyển đổi tức thì.
- **Virtual DOM like behavior**: Sử dụng template literals để tái tạo DOM nhanh chóng khi cần thiết (dù hiện tại render một lần).

### 3. **Tối ưu hóa DOM và Rendering**
- Sử dụng `requestIdleCallback()` cho các tác vụ khởi tạo không quan trọng (Animations, Theme logic).
- Implement `Intersection Observer` để chỉ animate các element bên trong section đang active.
- Giảm số lượng particles trong canvas animation để phù hợp với từng thiết bị (Responsive performance).

### 4. **Tối ưu hóa Performance**
- **FPS Limiting**: Canvas animation được tối ưu để không chiếm dụng quá nhiều resources.
- **Debouncing**: Áp dụng cho các sự kiện resize và click liên tục (ví dụ: theme switcher).
- **GPU Acceleration**: Sử dụng `transform` và `opacity` cho các animations để kích hoạt Hardware Acceleration.
- **No Scroll Listeners**: Loại bỏ các sự kiện cuộn (scroll events) đắt đỏ nhờ chuyển sang mô hình Section-based.

### 5. **Memory Management**
- Cleanup functions cho animations khi chuyển đổi tab/section (nếu cần).
- Sử dụng biến CSS (CSS Variables) để quản lý theme, giảm overhead khi switch theme.
- Giới hạn số lượng DOM elements được render bằng cách ẩn các section không hoạt động (`display: none`).

### 6. **CSS Optimizations**
- `will-change` properties cho elements cần critical animation.
- Modern Layouts (Grid/Flexbox) thay vì float/position tuyệt đối cồng kềnh.
- `content-visibility` (nếu browser hỗ trợ) giúp browser skip rendering off-screen content.

### 7. **Loading Strategy**
- **Critical Path**: Tải khung HTML và CSS chính trước.
- **Data Injection**: JS inject dữ liệu từ `cv-data.js` ngay khi DOM ready.
- **Deferred Scripts**: Các script logic và animation được set `defer` hoặc load qua idle callbacks.
- **Canvas**: Load cuối cùng (delay 500ms) để ưu tiên First Input Delay (FID).

## Kết quả Performance:

### Trước tối ưu hóa (Scroll-based):
- Initial render: Tốt, nhưng Layout Shift cao khi cuộn.
- Interaction: Có độ trễ khi cuộn trang dài nhiều nội dung.
- JavaScript blocking: Main thread bị block khi load tất cả script cùng lúc.

### Sau tối ưu hóa (Section-based):
- **Navigation**: Tức thì (Instant), không có layout shift.
- **FPS**: Ổn định ở mức cao do browser chỉ phải paint vùng nhìn thấy nhỏ hơn.
- **Resource Usage**: CPU/GPU usage giảm đáng kể khi user đứng yên tại một section.
- **Core Web Vitals**: Cải thiện LCP (Largest Contentful Paint) và CLS (Cumulative Layout Shift).

## Cách sử dụng:

```html
<!-- Tải CV content -->
<script src="components/cv-renderer.js" defer></script>
<script src="components/animation-manager.js" defer></script>
<script src="components/canvas-animation.js" defer></script>
```

```javascript
// Initialize CV
document.addEventListener('DOMContentLoaded', () => {
    // Render CV immediately
    window.CVRenderer.render(CVData);
    
    // Load animations when idle
    requestIdleCallback(() => {
        window.AnimationManager.init();
        
        // Canvas last for best performance
        setTimeout(() => {
            window.CanvasAnimation.init();
        }, 500);
    });
});
```

## Browser Support:
- Modern browsers với ES6+ support
- Fallbacks cho `requestIdleCallback` và `IntersectionObserver`
- Progressive enhancement cho CSS features

## Monitoring Performance:
- Sử dụng Performance API để track load times
- Console logging cho development debugging
- Optional performance metrics collection
