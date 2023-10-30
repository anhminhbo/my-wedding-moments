# Requirements
- Người dùng có đăng ảnh khoảnh khắc trong lễ cưới của Minh-Thy, có thể xem tất cả các ảnh trong lễ cưới

# Main functions:
- 1 Responsive Web App để upload photos( multiple photos - capped 5 photos) và xem tất cả các hình ảnh
    - Scroll hiện ảnh theo chiều dọc
- Lưu trữ ảnh: Google Drive
- Persistent metadata: MongoDB Atlas 512MB free
- 2 roles:
    - Role default: Ai cũng có thể đăng và xem hình
    - Role admin: Có thêm xoá ảnh
- Muốn biết ảnh này là của ai để dễ quản lý - recommend phân ảnh theo Category

# Non-functional:
- Cần READ rất nhiều, Write thì chỉ cần lúc upload, ko phải ai cũng có nhu cầu upload nên WRITE hạn chế

# Add-on:
- Tự động crop ảnh sau khi upload
- Rate limit cho từng thiết bị để tránh có người phá

# UI:
- ![Sample UI](https://github.com/anhminhbo/my-wedding-moments/blob/main/SampleUI.png)

# Constaints:
- Không rõ là trên mobile thì load trang có được nhanh với 1 đống hình không?
- Không biết có cần load tất cả hình trong 1 trang không, hay là phân trang để tối đa hiệu suất load?
- Không biết có rate limit được cho từng thiết bị hay không?
- Không biết có thể upload nhiều ảnh một lúc được không?
- Có thể lưu hình sao để quản lý được việc hình này do ai upload không?
- Có thể crop hình lúc upload không?

# Technical:
- Stack: MERN: Mongo, Express, React, Nodejs
- Infra: GKE
- Persistent Metadata Storage: Mongo DB Atlas
- Persistent Images Storage: Google Drive