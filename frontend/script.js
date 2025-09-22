// Frontend demo script: saves accounts in localStorage and simulates backend via browser storage.
// Note: For real dynamic app, connect to a backend API instead.

// Utilities
function readAccounts(){
  return JSON.parse(localStorage.getItem('jb_accounts')||'{}');
}
function writeAccounts(obj){
  localStorage.setItem('jb_accounts', JSON.stringify(obj));
}
function generateAccNo(){
  const obj = readAccounts();
  const count = Object.keys(obj).length + 1;
  return 'AC' + String(1000 + count);
}

// Register logic (register.html)
document.addEventListener('submit', function(e){
  if(e.target && e.target.id === 'registerForm'){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const pin = document.getElementById('password').value.trim();
    const balance = parseFloat(document.getElementById('balance').value || '0');
    const accNo = generateAccNo();
    const accounts = readAccounts();
    accounts[accNo] = { accNo, name, pin, balance, tx: [ {t: new Date().toISOString(), desc: 'Account opened', amount: balance} ] };
    writeAccounts(accounts);
    alert('Account created! Account No: ' + accNo + '\\nPlease login.');
    window.location.href = 'login.html';
  }
});

// Login logic (login.html)
document.addEventListener('submit', function(e){
  if(e.target && e.target.id === 'loginForm'){
    e.preventDefault();
    const acc = document.getElementById('accNo').value.trim();
    const pin = document.getElementById('pin').value.trim();
    const accounts = readAccounts();
    const user = accounts[acc];
    if(user && user.pin === pin){
      // store session
      localStorage.setItem('jb_session', acc);
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials');
    }
  }
});

// Dashboard page logic
if(location.pathname.endsWith('dashboard.html')){
  const acc = localStorage.getItem('jb_session');
  const accounts = readAccounts();
  if(!acc || !accounts[acc]){
    alert('Please login first');
    window.location.href = 'login.html';
  } else {
    const user = accounts[acc];
    document.getElementById('welcome').innerText = 'Welcome, ' + user.name;
    function refresh(){
      const u = readAccounts()[acc];
      document.getElementById('balanceView').innerText = '₹' + u.balance.toFixed(2);
      const st = document.getElementById('statement');
      st.innerHTML = '';
      const last = (u.tx||[]).slice(-5).reverse();
      last.forEach(t=>{
        const li = document.createElement('li');
        li.textContent = `${new Date(t.t).toLocaleString()} — ${t.desc} — ₹${t.amount}`;
        st.appendChild(li);
      });
    }
    refresh();

    document.getElementById('depositBtn').addEventListener('click', ()=>{
      const amt = parseFloat(document.getElementById('depositAmt').value || '0');
      if(amt <= 0){ alert('Enter positive amount'); return; }
      const obj = readAccounts();
      obj[acc].balance += amt;
      obj[acc].tx.push({t:new Date().toISOString(), desc:'Deposit', amount:amt});
      writeAccounts(obj); refresh();
      alert('Deposited ₹' + amt);
    });
    document.getElementById('withdrawBtn').addEventListener('click', ()=>{
      const amt = parseFloat(document.getElementById('withdrawAmt').value || '0');
      const obj = readAccounts();
      if(amt <= 0){ alert('Enter positive amount'); return; }
      if(obj[acc].balance >= amt){
        obj[acc].balance -= amt;
        obj[acc].tx.push({t:new Date().toISOString(), desc:'Withdraw', amount: -amt});
        writeAccounts(obj); refresh();
        alert('Withdrawn ₹' + amt);
      } else {
        alert('Insufficient balance');
      }
    });

    document.getElementById('logoutLink').addEventListener('click', ()=>{
      localStorage.removeItem('jb_session');
      window.location.href = 'login.html';
    });
  }
}

// small helper to prefill fields when file served at root
if(location.pathname.endsWith('index.html') || location.pathname === '/' ){
  // nothing for now
}
