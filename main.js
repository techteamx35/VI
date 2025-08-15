const container = document.getElementById('versionContainer');

// NEWS POPUP ON BOOKING PAGE LOAD
function showNewsPopup(newsHtml) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(16, 24, 32, 0.85)';
  overlay.style.zIndex = '10000';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';

  const popup = document.createElement('div');
  popup.style.background = '#101820';
  popup.style.padding = '28px 24px 20px 24px';
  popup.style.borderRadius = '14px';
  popup.style.boxShadow = '0 0 20px #00ff99a0, 0 0 8px #00bfff80';
  popup.style.textAlign = 'center';
  popup.style.maxWidth = '420px';
  popup.style.width = '95%';
  popup.style.border = '2px solid #00ff99';
  popup.style.fontFamily = "'Fira Mono', 'Consolas', 'Courier New', monospace";

  const title = document.createElement('h2');
  title.textContent = 'Latest News';
  title.style.margin = '0 0 10px 0';
  title.style.color = '#00ff99';
  title.style.fontFamily = "'Fira Mono', 'Consolas', 'Courier New', monospace";
  title.style.textShadow = '0 0 8px #00ff99, 0 0 2px #00ff99';

  const newsDiv = document.createElement('div');
  newsDiv.innerHTML = newsHtml;
  newsDiv.style.color = '#00bfff';
  newsDiv.style.fontSize = '16px';
  newsDiv.style.marginBottom = '18px';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.style.background = 'linear-gradient(90deg, #00ff99 0%, #00bfff 100%)';
  closeBtn.style.color = '#101820';
  closeBtn.style.padding = '10px 24px';
  closeBtn.style.borderRadius = '8px';
  closeBtn.style.border = 'none';
  closeBtn.style.fontWeight = 'bold';
  closeBtn.style.fontFamily = "'Fira Mono', 'Consolas', 'Courier New', monospace";
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.boxShadow = '0 0 8px #00ff99, 0 0 2px #00bfff';
  closeBtn.onclick = function() {
    document.body.removeChild(overlay);
  };

  popup.appendChild(title);
  popup.appendChild(newsDiv);
  popup.appendChild(closeBtn);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

function fetchAndShowNewsPopup() {
  fetch('https://shahiidtatkal.github.io/Shahid/accest/notice.json?nocache=' + new Date().getTime())
    .then(res => {
      if (!res.ok) {
        alert('NEWS fetch failed: HTTP ' + res.status);
        throw new Error('HTTP error');
      }
      return res.json();
    })
    .then(data => {
      if (data && data.news && data.news.trim() !== '') {
        showNewsPopup(data.news);
      } else {
        alert('NEWS JSON loaded but news property is empty or missing.');
      }
    })
    .catch((e) => {
      alert('NEWS fetch error: ' + e);
    });
}

// Detect booking page open after key entry
function isBookingPage() {
  // Always return true to show news popup once per session after key entry
  return true;
}

// Run on DOMContentLoaded and also on hashchange/popstate (for SPA)
function tryShowNewsOnBookingPage() {
  if (isBookingPage() && !window.__newsPopupShown) {
    window.__newsPopupShown = true;
    fetchAndShowNewsPopup();
  }
}

document.addEventListener('DOMContentLoaded', tryShowNewsOnBookingPage);
window.addEventListener('hashchange', tryShowNewsOnBookingPage);
window.addEventListener('popstate', tryShowNewsOnBookingPage);
fetch("https://shahiidtatkal.github.io/Shahid/accest/Version.json?nocache=" + new Date().getTime()).then(_0x599e5d => _0x599e5d.json()).then(_0x50d3ec => {
  const _0x389a2d = _0x50d3ec.latestVersion;
  const _0x2b7dda = _0x50d3ec.oldVersionMessage;
  const _0x10f4ba = document.createElement("div");
  const _0x2a0146 = document.createElement('span');
  _0x2a0146.textContent = "Version: V1.5.19 - ";
  _0x2a0146.style.fontWeight = "bold";
  _0x2a0146.style.fontSize = '15px';
  const _0x58b1df = document.createElement('span');
  _0x58b1df.style.fontSize = "15px";
  if ("V1.5.19" === _0x389a2d) {
    _0x58b1df.textContent = "You are using the latest version.";
    _0x58b1df.style.color = "green";
  } else if (compareVersions("V1.5.19", _0x389a2d) < 0x0) {
    _0x58b1df.textContent = "Please update this extension.";
    _0x58b1df.style.color = "red";
    showUpdatePopup(_0x2b7dda, _0x389a2d);
  } else {
    _0x58b1df.textContent = "Invalid version.";
    _0x58b1df.style.color = "orange";
    showUpdatePopup("Your extension version is invalid. Please update now.", _0x389a2d);
  }
  _0x10f4ba.appendChild(_0x2a0146);
  _0x10f4ba.appendChild(_0x58b1df);
  _0x10f4ba.style.fontFamily = "Arial, sans-serif";
  _0x10f4ba.style.paddingLeft = "10px";
  container.appendChild(_0x10f4ba);
});
function compareVersions(_0x47776, _0x56505c) {
  const _0x19aa6d = _0x47776.replace(/[^\d.]/g, '').split('.').map(Number);
  const _0x36dfd8 = _0x56505c.replace(/[^\d.]/g, '').split('.').map(Number);
  const _0x5210db = Math.max(_0x19aa6d.length, _0x36dfd8.length);
  for (let _0x49f2cd = 0x0; _0x49f2cd < _0x5210db; _0x49f2cd++) {
    const _0x542b36 = _0x19aa6d[_0x49f2cd] || 0x0;
    const _0x23c985 = _0x36dfd8[_0x49f2cd] || 0x0;
    if (_0x542b36 > _0x23c985) {
      return 0x1;
    }
    if (_0x542b36 < _0x23c985) {
      return -0x1;
    }
  }
  return 0x0;
}
function showUpdatePopup(_0x27f162, _0x407efa) {
  const _0x36d6d7 = document.createElement("div");
  _0x36d6d7.style.position = "fixed";
  _0x36d6d7.style.top = '0';
  _0x36d6d7.style.left = '0';
  _0x36d6d7.style.width = "100%";
  _0x36d6d7.style.height = "100%";
  _0x36d6d7.style.background = "rgba(16, 24, 32, 0.98)";
  _0x36d6d7.style.zIndex = '9999';
  _0x36d6d7.style.display = "flex";
  _0x36d6d7.style.justifyContent = 'center';
  _0x36d6d7.style.alignItems = "center";
  const _0x519b8c = document.createElement("div");
  _0x519b8c.style.background = "#101820";
  _0x519b8c.style.padding = '32px 28px 28px 28px';
  _0x519b8c.style.borderRadius = '16px';
  _0x519b8c.style.boxShadow = "0 0 30px #00ff99a0, 0 0 10px #00bfff80";
  _0x519b8c.style.textAlign = "center";
  _0x519b8c.style.maxWidth = "420px";
  _0x519b8c.style.width = "95%";
  _0x519b8c.style.border = "2.5px solid #00ff99";
  _0x519b8c.style.fontFamily = "'Fira Mono', 'Consolas', 'Courier New', monospace";
  const _0xcc0aa4 = document.createElement('h2');
  _0xcc0aa4.textContent = "Please update this extension";
  _0xcc0aa4.style.margin = '0px 0 10px 0';
  _0xcc0aa4.style.color = "#00ff99";
  _0xcc0aa4.style.fontFamily = "'Fira Mono', 'Consolas', 'Courier New', monospace";
  _0xcc0aa4.style.textShadow = "0 0 8px #00ff99, 0 0 2px #00ff99";
  const _0x5bd642 = document.createElement('p');
  _0x5bd642.textContent = "Latest Version: " + _0x407efa;
  _0x5bd642.style.fontWeight = 'bold';
  _0x5bd642.style.marginBottom = "8px";
  _0x5bd642.style.color = "#00bfff";
  _0x5bd642.style.fontSize = "17px";
  const _0x5235c5 = document.createElement("div");
  _0x5235c5.innerHTML = _0x27f162;
  _0x5235c5.style.marginBottom = "20px";
  _0x5235c5.style.color = "#00ff99";
  _0x5235c5.style.fontSize = "15px";
  _0x5235c5.style.fontFamily = "'Fira Mono', 'Consolas', 'Courier New', monospace";
  const _0x3d2286 = document.createElement('a');
  _0x3d2286.href = 'https://rajbull.shop/login.php';
  _0x3d2286.textContent = "Update Now";
  _0x3d2286.target = "_blank";
  _0x3d2286.style.background = 'linear-gradient(90deg, #00ff99 0%, #00bfff 100%)';
  _0x3d2286.style.color = "#101820";
  _0x3d2286.style.padding = "12px 28px";
  _0x3d2286.style.borderRadius = '8px';
  _0x3d2286.style.textDecoration = "none";
  _0x3d2286.style.fontWeight = "bold";
  _0x3d2286.style.fontFamily = "'Fira Mono', 'Consolas', 'Courier New', monospace";
  _0x3d2286.style.boxShadow = "0 0 10px #00ff99, 0 0 2px #00bfff";
  _0x3d2286.style.transition = "background 0.2s, color 0.2s, box-shadow 0.2s";
  _0x3d2286.onmouseover = function() {
    _0x3d2286.style.background = 'linear-gradient(90deg, #00bfff 0%, #00ff99 100%)';
    _0x3d2286.style.color = '#fff';
    _0x3d2286.style.boxShadow = "0 0 20px #00ff99, 0 0 8px #00bfff";
  };
  _0x3d2286.onmouseout = function() {
    _0x3d2286.style.background = 'linear-gradient(90deg, #00ff99 0%, #00bfff 100%)';
    _0x3d2286.style.color = '#101820';
    _0x3d2286.style.boxShadow = "0 0 10px #00ff99, 0 0 2px #00bfff";
  };
  _0x519b8c.appendChild(_0xcc0aa4);
  _0x519b8c.appendChild(_0x5bd642);
  _0x519b8c.appendChild(_0x5235c5);
  _0x519b8c.appendChild(_0x3d2286);
  _0x36d6d7.appendChild(_0x519b8c);
  document.body.appendChild(_0x36d6d7);
}
document.getElementById("openPopupTab").addEventListener("click", () => {
  chrome.tabs.create({
    'url': chrome.runtime.getURL('popup.html')
  });
});
(function () {
  const _0x2e8ebb = setInterval(() => {
    const _0x2519ac = document.getElementById('clearCheckbox');
    const _0x2340f7 = document.getElementById("irctc-login");
    const _0x377636 = document.getElementById("irctc-password");
    if (!_0x2519ac || !_0x2340f7 || !_0x377636) {
      return;
    }
    clearInterval(_0x2e8ebb);
    const _0x5aa544 = localStorage.getItem("irctcClearCheckbox");
    if (_0x5aa544 === "checked") {
      _0x2519ac.checked = true;
      _0x191565();
    }
    _0x2519ac.addEventListener("change", function () {
      if (_0x2519ac.checked) {
        _0x191565();
        localStorage.setItem("irctcClearCheckbox", 'checked');
      } else {
        _0x2340f7.disabled = false;
        _0x377636.disabled = false;
        localStorage.setItem('irctcClearCheckbox', "unchecked");
      }
    });
    function _0x191565() {
      _0x373f1c(_0x2340f7);
      _0x373f1c(_0x377636);
      _0x2340f7.disabled = true;
      _0x377636.disabled = true;
    }
    function _0x373f1c(_0xe254e8) {
      _0xe254e8.value = '';
      _0xe254e8.dispatchEvent(new Event("input", {
        'bubbles': true
      }));
      _0xe254e8.dispatchEvent(new Event("change", {
        'bubbles': true
      }));
    }
  }, 0x12c);
})();
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["plan_expiry"], _0x2ce679 => {
    const _0x47e524 = document.getElementById('UserPlanExpairy');
    if (_0x47e524 && _0x2ce679.plan_expiry !== undefined) {
      if (_0x2ce679.plan_expiry) {
        _0x47e524.textContent = _0x2ce679.plan_expiry;
        const _0x152fe9 = new Date(_0x2ce679.plan_expiry);
        const _0x1c39e8 = new Date();
        _0x47e524.style.color = _0x1c39e8 <= _0x152fe9 ? 'green' : "red";
      } else {
        _0x47e524.textContent = "User Not Found";
        _0x47e524.style.color = "orange";
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const _0xf7cd8f = document.getElementById("submitBtn2autoClickCheckbox");
  chrome.storage.sync.get(["submitBtn2autoClickEnabled"], function (_0x16898b) {
    _0xf7cd8f.checked = _0x16898b.submitBtn2autoClickEnabled || false;
  });
  _0xf7cd8f.addEventListener("change", function () {
    chrome.storage.sync.set({
      'submitBtn2autoClickEnabled': _0xf7cd8f.checked
    }, function () {
      console.log("Setting saved:", _0xf7cd8f.checked);
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var _0x204c80 = document.getElementById("cardexpiry");
  if (_0x204c80) {
    _0x204c80.addEventListener("input", function (_0x50c2da) {
      var _0x4ad19b = _0x50c2da.target.value.replace(/\D/g, '');
      if (_0x4ad19b.length > 0x4) {
        _0x4ad19b = _0x4ad19b.slice(0x0, 0x4);
      }
      if (_0x4ad19b.length >= 0x3) {
        _0x4ad19b = _0x4ad19b.slice(0x0, 0x2) + '/' + _0x4ad19b.slice(0x2);
      }
      _0x50c2da.target.value = _0x4ad19b;
    });
  }
});
async function loadNotice() {
  try {
    const _0x5004dd = await fetch('https://shahiidtatkal.github.io/Shahid/accest/notice.json?nocache=' + new Date().getTime());
    const _0x5aab4d = await _0x5004dd.json();
    const _0x39b0fa = _0x5aab4d.notice;
    const _0x5215e3 = document.getElementById("notice-container");
    if (_0x39b0fa && _0x39b0fa.trim() !== '') {
      _0x5215e3.innerHTML = _0x39b0fa;
      _0x5215e3.style.display = "block";
    } else {
      _0x5215e3.innerHTML = '';
      _0x5215e3.style.display = 'none';
    }
  } catch (_0x3fe468) {
    console.error("Failed to fetch notice:", _0x3fe468);
  }
}
loadNotice();
document.getElementById("openPopupTab").addEventListener('click', () => {
  chrome.tabs.create({
    'url': chrome.runtime.getURL('popup.html')
  });
});
(function () {
  const _0x29771a = setInterval(() => {
    const _0x17e271 = document.getElementById("clearCheckbox");
    const _0x3ae99f = document.getElementById("irctc-login");
    const _0x2c3186 = document.getElementById("irctc-password");
    if (!_0x17e271 || !_0x3ae99f || !_0x2c3186) {
      return;
    }
    clearInterval(_0x29771a);
    const _0x3eb3de = localStorage.getItem("irctcClearCheckbox");
    if (_0x3eb3de === "checked") {
      _0x17e271.checked = true;
      _0x3964ec();
    }
    _0x17e271.addEventListener("change", function () {
      if (_0x17e271.checked) {
        _0x3964ec();
        localStorage.setItem('irctcClearCheckbox', "checked");
      } else {
        _0x3ae99f.disabled = false;
        _0x2c3186.disabled = false;
        localStorage.setItem("irctcClearCheckbox", "unchecked");
      }
    });
    function _0x3964ec() {
      _0xde688d(_0x3ae99f);
      _0xde688d(_0x2c3186);
      _0x3ae99f.disabled = true;
      _0x2c3186.disabled = true;
    }
    function _0xde688d(_0x4033ea) {
      _0x4033ea.value = '';
      _0x4033ea.dispatchEvent(new Event("input", {
        'bubbles': true
      }));
      _0x4033ea.dispatchEvent(new Event("change", {
        'bubbles': true
      }));
    }
  }, 0x12c);
})();
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['plan_expiry'], _0x5d3cb1 => {
    const _0x343267 = document.getElementById('UserPlanExpairy');
    if (_0x343267 && _0x5d3cb1.plan_expiry !== undefined) {
      if (_0x5d3cb1.plan_expiry) {
        _0x343267.textContent = _0x5d3cb1.plan_expiry;
        const _0x5ef978 = new Date(_0x5d3cb1.plan_expiry);
        const _0x339dda = new Date();
        _0x343267.style.color = _0x339dda <= _0x5ef978 ? "green" : "red";
      } else {
        _0x343267.textContent = "User Not Found";
        _0x343267.style.color = 'orange';
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const _0x2f70c1 = document.getElementById('submitBtn2autoClickCheckbox');
  chrome.storage.sync.get(["submitBtn2autoClickEnabled"], function (_0x26ba40) {
    _0x2f70c1.checked = _0x26ba40.submitBtn2autoClickEnabled || false;
  });
  _0x2f70c1.addEventListener("change", function () {
    chrome.storage.sync.set({
      'submitBtn2autoClickEnabled': _0x2f70c1.checked
    }, function () {
      console.log("Setting saved:", _0x2f70c1.checked);
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  var _0x3aa69f = document.getElementById('cardexpiry');
  if (_0x3aa69f) {
    _0x3aa69f.addEventListener("input", function (_0x2fa976) {
      var _0x1ec382 = _0x2fa976.target.value.replace(/\D/g, '');
      if (_0x1ec382.length > 0x4) {
        _0x1ec382 = _0x1ec382.slice(0x0, 0x4);
      }
      if (_0x1ec382.length >= 0x3) {
        _0x1ec382 = _0x1ec382.slice(0x0, 0x2) + '/' + _0x1ec382.slice(0x2);
      }
      _0x2fa976.target.value = _0x1ec382;
    });
  }
});