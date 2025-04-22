# Tài liệu Đặc tả Chức năng - Ứng dụng Nhắc hẹn Cơ bản

## Chương I: Giới thiệu

### 1. Mục tiêu
Phát triển một ứng dụng web đơn giản cho phép người dùng tạo, quản lý và nhận thông báo (dưới dạng hiển thị trên giao diện) về các cuộc hẹn hoặc sự kiện quan trọng. Ứng dụng sẽ sử dụng Laravel cho backend và React-TS cho frontend.

### 2. Phạm vi chức năng chính
* **Quản lý Người dùng:** Đăng ký, đăng nhập, đăng xuất tài khoản.
* **Quản lý Lịch hẹn (Appointments):**
    * Tạo lịch hẹn mới với tiêu đề, mô tả, ngày và giờ hẹn.
    * Xem danh sách các lịch hẹn sắp tới và đã qua.
    * Chỉnh sửa thông tin chi tiết của lịch hẹn.
    * Xóa lịch hẹn.
* **Hiển thị Nhắc nhở:** Hiển thị các lịch hẹn sắp tới trên giao diện người dùng. (Phiên bản cơ bản chưa bao gồm gửi email/thông báo đẩy).

## Chương II: Yêu cầu chức năng chi tiết

### 1. Đăng ký, đăng nhập và quản lý tài khoản
* Người dùng có thể tạo tài khoản mới bằng email và mật khẩu.
* Người dùng có thể đăng nhập vào hệ thống bằng tài khoản đã đăng ký.
* Người dùng có thể đăng xuất khỏi hệ thống.
* Hệ thống bảo mật mật khẩu người dùng.

### 2. Tạo và Quản lý Lịch hẹn
* Người dùng có thể tạo một lịch hẹn mới bằng cách cung cấp:
    * Tiêu đề (Bắt buộc)
    * Mô tả (Không bắt buộc)
    * Ngày và Giờ hẹn (Bắt buộc)
* Hệ thống lưu trữ thông tin lịch hẹn gắn với tài khoản người dùng đã tạo.
* Người dùng có thể xem danh sách tất cả các lịch hẹn của mình, sắp xếp theo thời gian (ví dụ: gần nhất trước).
* Người dùng có thể chọn một lịch hẹn cụ thể để xem chi tiết.
* Người dùng có thể chỉnh sửa Tiêu đề, Mô tả, Ngày và Giờ của một lịch hẹn đã tạo.
* Người dùng có thể xóa một lịch hẹn đã tạo.

### 3. Hiển thị Nhắc nhở
* Trên giao diện chính (sau khi đăng nhập), hệ thống hiển thị danh sách các lịch hẹn sắp diễn ra (ví dụ: trong vòng 24 giờ tới hoặc trong ngày hôm nay).
* Thông tin hiển thị bao gồm Tiêu đề và Thời gian hẹn.

## Chương III: Trường hợp sử dụng (Use Cases)

### 1. Sơ đồ Use Case tổng quan
* Đăng ký tài khoản
* Đăng nhập
* Đăng xuất
* Quản lý Lịch hẹn
    * Tạo Lịch hẹn
    * Xem danh sách Lịch hẹn
    * Xem chi tiết Lịch hẹn
    * Sửa Lịch hẹn
    * Xóa Lịch hẹn
* Xem nhắc nhở

### 2. Luồng sự kiện chính (Mô tả cơ bản)

* **Đăng ký:**
    1.  Người dùng nhập email, mật khẩu, xác nhận mật khẩu.
    2.  Hệ thống kiểm tra tính hợp lệ và email chưa tồn tại.
    3.  Hệ thống lưu thông tin người dùng vào CSDL.
    4.  Hệ thống thông báo thành công và chuyển đến trang đăng nhập.

* **Đăng nhập:**
    1.  Người dùng nhập email và mật khẩu.
    2.  Hệ thống kiểm tra thông tin đăng nhập với CSDL.
    3.  Nếu hợp lệ, hệ thống tạo phiên đăng nhập và chuyển đến trang chính (Dashboard/Danh sách hẹn).
    4.  Nếu không hợp lệ, hệ thống báo lỗi.

* **Tạo Lịch hẹn:**
    1.  Người dùng chọn chức năng "Tạo mới".
    2.  Người dùng nhập Tiêu đề, Mô tả (tùy chọn), Ngày và Giờ hẹn.
    3.  Hệ thống kiểm tra tính hợp lệ của dữ liệu (ngày giờ phải ở tương lai, tiêu đề không trống).
    4.  Hệ thống lưu lịch hẹn vào CSDL, gắn với user_id của người dùng hiện tại.
    5.  Hệ thống thông báo thành công và cập nhật danh sách lịch hẹn.

* **Xem danh sách Lịch hẹn:**
    1.  Người dùng truy cập trang chính.
    2.  Hệ thống lấy danh sách lịch hẹn của người dùng từ CSDL.
    3.  Hệ thống hiển thị danh sách (có thể phân trang nếu nhiều).

* **Sửa Lịch hẹn:**
    1.  Người dùng chọn một lịch hẹn từ danh sách và chọn "Sửa".
    2.  Hệ thống hiển thị form với thông tin hiện tại của lịch hẹn.
    3.  Người dùng thay đổi thông tin.
    4.  Hệ thống kiểm tra và cập nhật lịch hẹn trong CSDL.
    5.  Hệ thống thông báo thành công và cập nhật danh sách.

* **Xóa Lịch hẹn:**
    1.  Người dùng chọn một lịch hẹn và chọn "Xóa".
    2.  Hệ thống yêu cầu xác nhận.
    3.  Nếu xác nhận, hệ thống xóa lịch hẹn khỏi CSDL.
    4.  Hệ thống thông báo thành công và cập nhật danh sách.

## Chương IV: Yêu cầu về mặt kĩ thuật

### 1. Công nghệ
* Frontend: React-TS
* Backend: Laravel
* Database: SQLite

### 2. Cấu trúc thư mục
```
event_reminder
|
|--backend
|--frontend
```
### 3. Cấu trúc database
Cấu trúc database dưới dạng mã SQL:
```sql
-- Bảng Người dùng (Users)
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- Thêm tên người dùng
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng Lịch hẹn (Appointments)
CREATE TABLE appointments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,      -- Khóa ngoại liên kết tới người dùng
    title VARCHAR(255) NOT NULL,           -- Tiêu đề lịch hẹn
    description TEXT NULL,                 -- Mô tả chi tiết (tùy chọn)
    appointment_time TIMESTAMP NOT NULL,   -- Ngày giờ cụ thể của lịch hẹn
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Nếu user bị xóa, lịch hẹn cũng bị xóa
);

-- Chỉ mục (Indexes) để tăng tốc truy vấn
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_appointment_time ON appointments(appointment_time);
```

### 4. List các component dưới dạng code html
#### 4.1. Input
- Chức năng: Định nghĩa UI cho input
- Code
```html
<style>
    input {
        width: 270px;
        height: 52px;
        background: white;
        border-radius: 10px;
        border: 1px solid #B7B7B7;
        padding-left: 16px;
    }
</style>

<input type="text" placeholder="Placeholder">
```
- Props:
    - `placeholder`: Để hiển thị nội dung bên trong input
    - `type`: Để xác định loại input
        - `text`: Để nhập văn bản
        - `email`: Để nhập email
        - `password`: Để nhập mật khẩu
        - `datetime-local`: Để nhập ngày giờ
    - `onChange`: Để xử lý sự kiện khi người dùng thay đổi nội dung trong input
#### 4.2. Button
- Chức năng: Định nghĩa các UI cho button
- Code
```html
<button>Text</button>
<style>
    button {
        width: 210px;
        height: 52px;
        cursor: pointer;
        background: #38A7FF;
        border-radius: 10px;
        border: none;
    }

    button:hover {
        background-color: #0081E8;
    }
</style>
- Props:
    - `text`: Để hiển thị nội dung bên trong button
    - `type`: Để xác định màu sắc và màu chữ của button
        - `primary`: 
            - background: #38A7FF
            - color: white
            - background hover: #0081E8
        - `edit`: Màu vàng
            - background: #F6C94C
            - color: black
            - background hover: #F6B52D
        - `delete`: Màu đỏ
            - background: #FF4D4D
            - color: white
            - background hover: #FF0000
    - `onClick`: Để xử lý sự kiện khi người dùng nhấn vào button

```
#### 4.3. Register Form
- Chức năng: Định nghĩa UI cho form đăng ký
- Code 
```html
<div style="width: 100%; height: 100%; background: white">
    <!-- Input Component, placeholder = "Name", type = "text" -->
    <!-- Input Component, placeholder = "Email", type = "email"-->
    <!-- Input Component, placeholder = "Password", type = "password" -->
    <!-- Input Component, placeholder = "Confirm Password", type = "password" -->
    <!-- Button Component, text = "Sign Up", type = "primary" -->
    <div>Already one? <span><a href="#">Sign in</a></span></div>
</div>
```
- Props:
    - `onSubmit`: Để xử lý sự kiện khi người dùng nhấn vào button Sign up

#### 4.4. Login Form
- Chức năng: Định nghĩa UI cho form đăng nhập
- Code 
```html
<div style="width: 100%; height: 100%; background: white">
    <!-- Input Component, placeholder = "Email", type = "email"-->
    <!-- Input Component, placeholder = "Password", type = "password" -->
    <!-- Button Component, text = "Sign In", type = "primary" -->
    <div><a href="#">Sign Up an account</a></div>
</div>
```
- Props:
    - `onSubmit`: Để xử lý sự kiện khi người dùng nhấn vào button Sign In

#### 4.5. Appointment Dialouge
- Chức năng: Định nghĩa UI cho form tạo/chỉnh sửa lịch hẹn
- Code 
```html
<div style="width: 100%; height: 100%; background: white">
    <!-- Input Component, placeholder = "Event Title", type = "text" -->
    <!-- Input Component, placeholder = "Time", type = "datetime-local"-->
    <!-- Input Component, placeholder = "Password", type = "text" -->
    <!-- Button Component, text = "Confirm", type = "primary" -->
    <div>Already one? <span><a href="#">Sign in</a></span></div>
</div>
```
- Props:
    - `onSubmit`: Để xử lý sự kiện khi người dùng nhấn vào button Confirm
    - `data`: Object chứa thông tin của lịch hẹn
    Cấu trúc `data`:
        {
            `title`: string, // Tiêu đề lịch hẹn
            `description`: string, // Mô tả lịch hẹn
            `time`: DateTime // Thời gian lịch hẹn
        }

#### 4.6. Appointment Card
- Chức năng: Định nghĩa UI hiển thị lịch hẹn
- Code 
```html
<div style="width: 100%; height: 100%; position: relative">
    <h3>Họp team dự án A</h3>
    <div style="color: #38A7FF; font-weight: bold;">Thời gian: 14:00 24/1/2025</div>
    <div>Mô tả: Thảo luận tiến độ và các vấn đề còn tồn động</div>
    <!-- Button Component, text = "Edit", type = "edit" -->
    <!-- Button Component, text = "Delete", type = "delete" -->
</div> 
```
- Props:
    - `data`: Object chứa thông tin của lịch hẹn
    Cấu trúc `data`:
        {
            `title`: string, // Tiêu đề lịch hẹn
            `description`: string, // Mô tả lịch hẹn
            `time`: DateTime // Thời gian lịch hẹn
        }
    - `onEdit`: Để xử lý sự kiện khi người dùng nhấn vào button Edit
    - `onDelete`: Để xử lý sự kiện khi người dùng nhấn vào button Delete

- Note
    - Khi khởi tạo component Appointment Card, cần so sánh thời gian hiện tại và thời gian lịch hẹn (`data`.`time`) để xác định xem lịch hẹn đã qua hay chưa. Nếu đã qua, thay đổi màu của thời gian thành màu đỏ và không hiển thị button Edit và Delete.
    
#### 4.7. Header
- Chức năng: Định nghĩa UI cho header
- Code 
```html
<style>
    .parent {
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: flex-end; /* Align child to the right */
    }

    .child-container {
        display: inline-block; /* Ensure width matches the content */
        margin-right: 0; /* Align to the right edge of the parent */
        color: black;
        font-weight: bold;
    }
</style>

<div class="parent">
    <div class="child-container">
        Xin chào, Nguyễn Hoàng Anh
        <!-- Button Component, text = "Sign out", type = "delete" -->
    </div>
</div>
```
- Props:
    - `onSignOut`: Để xử lý sự kiện khi người dùng nhấn vào button Sign out
    - `name`: Để hiển thị tên người dùng trong header

### 5. List các page 
#### 5.1. Register Page
- Chức năng: Định nghĩa UI cho trang đăng ký
- Code 
```html
<style>
    .parent {
        width: 100%;
        height: 100%;
        position: relative;
        background: rgba(193, 241, 255, 0.47);
        overflow: hidden;
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center;   /* Center vertically */
    }

    .child {
        padding: 16px;
        background: white;
    }
</style>

<div class="parent">
    <div class="child">
        <!-- Register Form component -->
    </div>
</div>
```
- Mô tả các hành động
    - Khi người dùng nhấn vào button Sign up, kiểm tra tính hợp lệ của các trường trong form. Nếu hợp lệ, gửi request đến API để tạo tài khoản mới. Nếu không hợp lệ, hiển thị thông báo lỗi. Ngược lại, chuyển đến trang đăng nhập.
    - Khi người dùng nhấn vào link Sign in, chuyển đến trang đăng nhập.
#### 5.2. Login Page
- Chức năng: Định nghĩa UI cho trang đăng nhập
- Code 
```html
<style>
    .parent {
        width: 100%;
        height: 100%;
        position: relative;
        background: rgba(193, 241, 255, 0.47);
        overflow: hidden;
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center;   /* Center vertically */
    }

    .child {
        padding: 16px;
        background: white;
    }
</style>

<div class="parent">
    <div class="child">
        <!-- Login Form component -->
    </div>
</div>
```
- Mô tả các hành động
    - Khi người dùng nhấn vào button Sign in, kiểm tra tính hợp lệ của các trường trong form. Nếu hợp lệ, gửi request đến API để đăng nhập. Nếu không hợp lệ, hiển thị thông báo lỗi. Ngược lại, chuyển đến trang chính (Dashboard).
    - Khi người dùng nhấn vào link Sign up an account, chuyển đến trang đăng ký.
    
#### 5.3. Dashboard Page
- Chức năng: Định nghĩa UI cho trang chính (Dashboard)
- Code 
```html
<style>
    .view-appointment-container {
        display: grid;
        grid-template-columns: 1fr 1fr; /* 2 columns of equal width */
        gap: 16px; /* Space between columns */
        padding: 16px;
    }

    .list {
        display: grid;
        grid-template-columns: 1fr; /* Single column layout */
        gap: 8px; /* Space between items in the list */
    }

    .header {
        font-weight: bold;
        margin-bottom: 8px;
    }
</style>

<div style="width: 100%; height: 100%; background: rgba(241.51, 241.51, 241.51, 0.47); overflow: hidden">
    <!-- Header component, name = "name" -->
    <div class="view-appointment-container">
        <div class="upcoming-appointment">
            <div class="header">
                <div class="title">Upcoming Appointment</div>
                <!-- Button Component, text= "New Appointment", type = "primary" -->
            </div>
            <div class="list">
                <!-- List of Appointment Card Component -->
            </div>
        </div>
        <div class="overdue-appointment">
            <div class="header">
                <div class="title">Overdue Appointment</div>
                <!-- Button Component, text= "Delete All", type="delete" -->
            </div>
            <div class="list">
                <!-- List of Appointment Card Component-->
            </div>
        </div>
    </div>
</div>
```
- Mô tả các hành động
    - Khi người dùng nhấn vào button New Appointment, mở form tạo lịch hẹn (Appointment Dialouge) với các trường trống.
    - Khi người dùng nhấn vào button Delete All, xóa tất cả các lịch hẹn đã qua.
    - Khi người dùng nhấn vào button Edit trong Appointment Card, mở form tạo lịch hẹn (Appointment Dialouge) với các trường đã được điền sẵn thông tin của lịch hẹn đó.
    - Khi người dùng nhấn vào button Delete trong Appointment Card, xóa lịch hẹn đó khỏi danh sách.
    - Khi người dùng nhấn vào button Sign out trong Header, đăng xuất khỏi tài khoản và chuyển về trang đăng nhập.