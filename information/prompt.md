## Setup thư mục

```
Dựa trên nội dung của dự án được mô tả trong file description.md, thiết lập các thư mục cho dự án

Các bước thực hiện:

1. Tạo folder event_reminder/event_reminder_app
2. Tạo 2 folder backend và frontend trong folder event_reminder_app

Đảm bảo tất cả các bước được thực hiện một cách tuần tự và phải đượ hoàn thành mà không phát sinh lỗi. Với các lệnh terminal, viết các lệnh cho môi trường Linux và phải đảm bảo các lệnh được thực thi mà không có lỗi nào xảy ra
```

## Tạo Backend
Tạo Project
```
Dựa trên nội dung của dự án của description.md, tạo backend cho dự án

Các bước thực hiện:

1. Tạo một project Laravel tên event_reminder_backend trong folder event_reminder_app/backend
2. Thay đổi các config của backend sao cho dự án hoạt động với SQLite3
3. Un-migrate database đang có

Đảm bảo tất cả các bước được thực hiện một cách tuần tự và phải đượ hoàn thành mà không phát sinh lỗi. Với các lệnh terminal, viết các lệnh cho môi trường Linux và phải đảm bảo các lệnh được thực thi mà không có lỗi nào xảy ra
```
Setup ORM
```
Dựa trên nội dung của dự án của description.md, thiết lập ORM cho backend

Các bước thực hiện:

1. Tạo các file migration nhằm tạo database theo mô tả của dự án
2. Tạo các model tương ứng dựa trên database và migration. 
3. Với mỗi model, khai báo các biến $table, $fillable và các relationship với các model khác nếu có


Đảm bảo tất cả các bước được thực hiện một cách tuần tự và phải đượ hoàn thành mà không phát sinh lỗi. Với các lệnh terminal, viết các lệnh cho môi trường Linux và phải đảm bảo các lệnh được thực thi mà không có lỗi nào xảy ra
```
Setup database
```
Dựa trên nội dung của dự án của description.md, thiết lập ORM cho backend

Các bước thực hiện:

1. Tạo các Data Seeder tương ứng với các bảng
2. Thực hiện migrate database và seed data vào database


Đảm bảo tất cả các bước được thực hiện một cách tuần tự và phải đượ hoàn thành mà không phát sinh lỗi. Với các lệnh terminal, viết các lệnh cho môi trường Linux và phải đảm bảo các lệnh được thực thi mà không có lỗi nào xảy ra
```
Setup API
```
Dựa trên nội dung của dự án trong file description.md và mô tả API trong file api.yaml, thiết lập các API cho backend

Các bước thực hiện:

1. Cài đặt api thông qua command php artisan install:api
2. Tạo controller và api cho các chức năng được liệt kê trong file description.md

Đảm bảo tất cả các bước được thực hiện một cách tuần tự và phải đượ hoàn thành mà không phát sinh lỗi. Với các lệnh terminal, viết các lệnh cho môi trường Linux và phải đảm bảo các lệnh được thực thi mà không có lỗi nào xảy ra
```

## Tạo Frontend

Tạo Project
```
Dựa trên nội dung của dự án của description.md, tạo frontend cho dự án

Các bước thực hiện:

1. Tạo một project React-TS tên event_reminder_frontend trong folder event_reminder_app/event_reminder/frontend thông qua Vite, sử dụng template react-ts
2. Cài đặt thư viện sass cho frontend project
3. Thiết lập file tsconfig.json và vite.config. nhằm thiết lập Absolute Imports cho dự án

Đảm bảo tất cả các bước được thực hiện một cách tuần tự và phải đượ hoàn thành mà không phát sinh lỗi. Với các lệnh terminal, viết các lệnh cho môi trường Linux và phải đảm bảo các lệnh được thực thi mà không có lỗi nào xảy ra
```
Tạo Component
```
Dựa trên mô tả của các component trong file description.md, tạo các component cho dự án

Các bước thực hiện:

1. Dựa trên mô tả của các component trong file description.md, tạo ra các component tương ứng. Yêu cầu sử dụng scss file thay vì css file

Đảm bảo tất cả các bước được thực hiện một cách tuần tự và phải đượ hoàn thành mà không phát sinh lỗi. Với các lệnh terminal, viết các lệnh cho môi trường Linux và phải đảm bảo các lệnh được thực thi mà không có lỗi nào xảy ra
```
Tạo các services
```
Dựa trên nội dung của dự án của description.md và mô tả API trong api.yaml, tạo các services cho frontend

Các bước thực hiện:

1. Thiết lập các services cần thiết để gửi request và nhận response từ API, dựa theo mô tả trong api.yaml

Đảm bảo tất cả các bước được thực hiện một cách tuần tự và phải đượ hoàn thành mà không phát sinh lỗi. Với các lệnh terminal, viết các lệnh cho môi trường Linux và phải đảm bảo các lệnh được thực thi mà không có lỗi nào xảy ra
```

Tạo Pages
```
Dựa trên mô tả của các pages trong file description.md, tạo các pages cho dự án

Các bước thực hiện:

1. Dựa trên mô tả của các pages trong file description.md và các component đã tạo trước đó, tạo ra các pages tương ứng.
    - Các pages sẽ sử dụng các services đã tạo ở bước trước đó để hoàn thiện chức năng

Đảm bảo tất cả các bước được thực hiện một cách tuần tự và phải đượ hoàn thành mà không phát sinh lỗi. Với các lệnh terminal, viết các lệnh cho môi trường Linux và phải đảm bảo các lệnh được thực thi mà không có lỗi nào xảy ra
```
Khởi chạy frontend
```
Dựa trên mô tả của các pages trong file description.md, tạo các pages cho dự án

Các bước thực hiện:

1. Tạo các route tương ứng cho các pages vừa tạo
2. Khởi chạy dự án trên môi trường development nhằm để kiểm thử

Đảm bảo tất cả các bước được thực hiện một cách tuần tự và phải đượ hoàn thành mà không phát sinh lỗi. Với các lệnh terminal, viết các lệnh cho môi trường Linux và phải đảm bảo các lệnh được thực thi mà không có lỗi nào xảy ra
```
