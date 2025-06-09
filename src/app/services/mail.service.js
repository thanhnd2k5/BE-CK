import mailTransporter from '@/configs/mail-transporter'

export async function sendApplicationStatusEmail(application) {
    const { userId, universityMajorId, status } = application
    
    let statusText = ''
    switch(status) {
        case 'da_duyet':
            statusText = 'đã được duyệt'
            break
        case 'tu_choi':
            statusText = 'đã bị từ chối'
            break
        default:
            statusText = 'đang chờ duyệt'
    }

    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: userId.email,
        subject: 'Thông báo về trạng thái đơn xét tuyển',
        html: `
            <h2>Kính gửi ${userId.name},</h2>
            <p>Đơn xét tuyển của bạn vào ngành ${universityMajorId.name} ${statusText}.</p>
            <p>Vui lòng đăng nhập vào hệ thống để xem chi tiết.</p>
            <br>
            <p>Trân trọng,</p>
            <p>Ban tuyển sinh</p>
        `
    }

    try {
        await mailTransporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Error sending email:', error)
    }
}

export async function sendNewApplicationEmail(data) {
    const { application, profile, applicationResult } = data
    const { userId, universityMajorId, universityId ,admissionMethod, _id: applicationId } = application
    
    // Format phương thức xét tuyển
    let admissionMethodText = ''
    switch(admissionMethod) {
        case 'hoc_ba':
            admissionMethodText = 'Xét tuyển học bạ'
            break
        case 'tot_nghiep':
            admissionMethodText = 'Xét tuyển kết quả thi tốt nghiệp THPT'
            break
        case 'dgnl':
            admissionMethodText = 'Xét tuyển kết quả thi đánh giá năng lực'
            break
        case 'tu_duy':
            admissionMethodText = 'Xét tuyển kết quả thi tư duy'
            break
        default:
            admissionMethodText = admissionMethod
    }

    // Format kết quả học tập
    let resultText = ''
    if (applicationResult) {
        if (applicationResult.method === 'hoc_ba') {
            resultText = `
                <p>Kết quả học tập:</p>
                <ul>
                    <li>Điểm trung bình lớp 10: ${applicationResult.gpaGrade10}</li>
                    <li>Điểm trung bình lớp 11: ${applicationResult.gpaGrade11}</li>
                    <li>Điểm trung bình lớp 12: ${applicationResult.gpaGrade12}</li>
                </ul>
            `
        } else if (applicationResult.method === 'tot_nghiep') {
            resultText = `
                <p>Kết quả thi tốt nghiệp THPT:</p>
                <ul>
                    ${Object.entries(applicationResult.subjectScores).map(([subject, score]) => 
        `<li>${subject}: ${score}</li>`
    ).join('')}
                </ul>
            `
        } else {
            resultText = `
                <p>Kết quả thi: ${applicationResult.totalScore} điểm</p>
            `
        }
    }

    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: userId.email,
        subject: 'Xác nhận đơn xét tuyển',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2c3e50;">Kính gửi ${userId.name},</h2>
                
                <p>Chúng tôi đã nhận được đơn xét tuyển của bạn với thông tin sau:</p>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <h3 style="color: #2c3e50; margin-top: 0;">Thông tin đơn xét tuyển</h3>
                    <p><strong>Mã đơn:</strong> ${applicationId}</p>
                    <p><strong>Trường đại học:</strong> ${universityMajorId.university}</p>
                    <p><strong>Kỳ xét tuyển:</strong> ${application.admissionPeriodId.name}</p>
                    <p><strong>Ngành đăng ký:</strong> ${universityMajorId.name}</p>
                    <p><strong>Phương thức xét tuyển:</strong> ${admissionMethodText}</p>
                    ${resultText}
                </div>

                <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <h3 style="color: #2c3e50; margin-top: 0;">Thông tin cá nhân</h3>
                    <p><strong>Họ và tên:</strong> ${profile.name}</p>
                    <p><strong>Email:</strong> ${profile.email}</p>
                    <p><strong>Số điện thoại:</strong> ${profile.phone}</p>
                    <p><strong>Địa chỉ:</strong> ${profile.address}, ${profile.district}, ${profile.province}</p>
                </div>

                <p>Đơn của bạn đang được xem xét. Chúng tôi sẽ thông báo kết quả trong thời gian sớm nhất.</p>
                
                <p>Bạn có thể tra cứu trạng thái đơn xét tuyển bằng mã đơn trên.</p>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p style="color: #666;">Trân trọng,</p>
                    <p style="color: #666; font-weight: bold;">Ban tuyển sinh</p>
                </div>
            </div>
        `
    }

    try {
        await mailTransporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Error sending email:', error)
    }
} 