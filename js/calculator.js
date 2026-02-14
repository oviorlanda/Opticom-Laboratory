/* ============================================
   CALCULATOR.JS - UPDATED FOR ALL CALCULATORS
   ✅ NA Calculator (Refractive & Diameter modes)
   ✅ V-Number & Dispersion Calculator
   ✅ Unit Converter (dBm ⇌ mW)
   ✅ Link Power Budget Calculator
   ============================================ */

(function() {
    'use strict';

    console.log('📊 Calculator Script Loaded');

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    // Unit conversion to mm
    function toMm(value, unit) {
        switch(unit) {
            case 'mm': return value;
            case 'cm': return value * 10;
            case 'm':  return value * 1000;
            case 'in': return value * 25.4;
            default:   return value;
        }
    }

    // ============================================
    // NA CALCULATOR - MODE 1: REFRACTIVE INDEX
    // ============================================
    
    function calculateRefractive() {
        console.log('🧮 Calculating Refractive Index Mode...');

        const n1 = parseFloat(document.getElementById('n1-input')?.value);
        const n2 = parseFloat(document.getElementById('n2-input')?.value);
        const err = document.getElementById('error-ref');

        // Validation
        if (isNaN(n1) || isNaN(n2)) {
            err.textContent = '⚠️ Masukkan nilai n₁ dan n₂ yang valid.';
            err.style.display = 'block';
            return;
        }
        if (n1 < 1 || n2 < 1) {
            err.textContent = '⚠️ Refractive index tidak boleh kurang dari 1.';
            err.style.display = 'block';
            return;
        }
        if (n2 >= n1) {
            err.textContent = '⚠️ n₂ harus lebih kecil dari n₁ agar terjadi total internal reflection.';
            err.style.display = 'block';
            return;
        }
        err.style.display = 'none';

        // Calculate
        const NA = Math.sqrt(n1 * n1 - n2 * n2);
        const theta = Math.asin(Math.min(NA, 1)) * (180 / Math.PI);
        const thetaC = Math.asin(n2 / n1) * (180 / Math.PI);

        // Display results
        document.getElementById('na-ref').textContent = NA.toFixed(4);
        document.getElementById('theta-ref').textContent = theta.toFixed(2) + '°';
        document.getElementById('critical-ref').textContent = thetaC.toFixed(2) + '°';

        console.log('✅ Refractive result:', { NA, theta, thetaC });
    }

    function resetRefractive() {
        document.getElementById('n1-input').value = '1.50';
        document.getElementById('n2-input').value = '1.48';
        document.getElementById('na-ref').textContent = '-';
        document.getElementById('theta-ref').textContent = '-';
        document.getElementById('critical-ref').textContent = '-';
        document.getElementById('error-ref').style.display = 'none';
        console.log('🔄 Refractive mode reset.');
    }

    // ============================================
    // NA CALCULATOR - MODE 2: DIAMETER & DISTANCE
    // ============================================
    
    function calculateDiameter() {
        console.log('🧮 Calculating Diameter & Distance Mode...');

        const dVal = parseFloat(document.getElementById('d-input')?.value);
        const lVal = parseFloat(document.getElementById('l-input')?.value);
        const dUnit = document.getElementById('d-unit')?.value;
        const lUnit = document.getElementById('l-unit')?.value;
        const err = document.getElementById('error-dia');

        // Validation
        if (isNaN(dVal) || isNaN(lVal)) {
            err.textContent = '⚠️ Masukkan nilai D dan L yang valid.';
            err.style.display = 'block';
            return;
        }
        if (dVal <= 0 || lVal <= 0) {
            err.textContent = '⚠️ Nilai D dan L harus lebih besar dari 0.';
            err.style.display = 'block';
            return;
        }
        err.style.display = 'none';

        // Calculate
        const D = toMm(dVal, dUnit);
        const L = toMm(lVal, lUnit);
        const halfAngleRad = Math.atan(D / (2 * L));
        const NA = Math.sin(halfAngleRad);
        const halfAngle = halfAngleRad * (180 / Math.PI);
        const fullAngle = halfAngle * 2;

        // Display results
        document.getElementById('na-dia').textContent = NA.toFixed(4);
        document.getElementById('theta-dia').textContent = halfAngle.toFixed(2) + '°';
        document.getElementById('fullangle-dia').textContent = fullAngle.toFixed(2) + '°';

        console.log('✅ Diameter result:', { NA, halfAngle, fullAngle });
    }

    function resetDiameter() {
        document.getElementById('d-input').value = '25.4';
        document.getElementById('l-input').value = '100';
        document.getElementById('d-unit').value = 'mm';
        document.getElementById('l-unit').value = 'mm';
        document.getElementById('na-dia').textContent = '-';
        document.getElementById('theta-dia').textContent = '-';
        document.getElementById('fullangle-dia').textContent = '-';
        document.getElementById('error-dia').style.display = 'none';
        console.log('🔄 Diameter mode reset.');
    }

    // ============================================
    // NA CALCULATOR - TAB SWITCHING
    // ============================================
    
    function switchTab(mode) {
        console.log('🔀 Switching to tab:', mode);

        document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.calc-mode').forEach(m => m.classList.remove('active'));

        const activeTab = document.querySelector(`.calc-tab[data-tab="${mode}"]`);
        const activeMode = document.getElementById('mode-' + mode);

        if (activeTab) activeTab.classList.add('active');
        if (activeMode) activeMode.classList.add('active');
    }

    // ============================================
    // V-NUMBER CALCULATOR
    // ============================================

    function calculateVNumber() {
        console.log('🧮 Calculating V-Number...');

        const a = parseFloat(document.getElementById('vn-core-radius')?.value);
        const lambda = parseFloat(document.getElementById('vn-wavelength')?.value);
        const na = parseFloat(document.getElementById('vn-na')?.value);
        const err = document.getElementById('vn-error-v');

        // Validation
        if (isNaN(a) || isNaN(lambda) || isNaN(na)) {
            err.textContent = '⚠️ Mohon isi semua field terlebih dahulu.';
            err.style.display = 'block';
            return;
        }
        if (a <= 0 || lambda <= 0 || na <= 0) {
            err.textContent = '⚠️ Semua nilai harus lebih dari 0.';
            err.style.display = 'block';
            return;
        }
        if (na > 1) {
            err.textContent = '⚠️ NA tidak bisa lebih dari 1.';
            err.style.display = 'block';
            return;
        }
        err.style.display = 'none';

        // Calculate
        const a_m = a * 1e-6;
        const lambda_m = lambda * 1e-9;
        const V = (2 * Math.PI * a_m / lambda_m) * na;

        let fiberType, numModes;
        if (V < 2.405) {
            fiberType = 'Single-mode';
            numModes = '1 mode';
        } else {
            fiberType = 'Multi-mode';
            numModes = Math.floor((V * V) / 2) + ' modes';
        }

        // Display results
        document.getElementById('vn-v-value').textContent = V.toFixed(4);
        document.getElementById('vn-fiber-type').textContent = fiberType;
        document.getElementById('vn-num-modes').textContent = numModes;
        
        console.log('✅ V-Number result:', { V, fiberType, numModes });
    }

    function resetVNumber() {
        document.getElementById('vn-core-radius').value = '';
        document.getElementById('vn-wavelength').value = '';
        document.getElementById('vn-na').value = '';
        document.getElementById('vn-v-value').textContent = '-';
        document.getElementById('vn-fiber-type').textContent = '-';
        document.getElementById('vn-num-modes').textContent = '-';
        document.getElementById('vn-error-v').style.display = 'none';
        console.log('🔄 V-Number reset.');
    }

    // ============================================
    // DISPERSION CALCULATOR
    // ============================================

    function calculateDispersion() {
        console.log('🧮 Calculating Dispersion...');

        const D = parseFloat(document.getElementById('vn-disp-coeff')?.value);
        const L = parseFloat(document.getElementById('vn-fiber-length')?.value);
        const dLam = parseFloat(document.getElementById('vn-spectral-width')?.value);
        const err = document.getElementById('vn-error-d');

        // Validation
        if (isNaN(D) || isNaN(L) || isNaN(dLam)) {
            err.textContent = '⚠️ Mohon isi semua field terlebih dahulu.';
            err.style.display = 'block';
            return;
        }
        if (L <= 0 || dLam <= 0) {
            err.textContent = '⚠️ Length dan Spectral Width harus lebih dari 0.';
            err.style.display = 'block';
            return;
        }
        err.style.display = 'none';

        // Calculate
        const deltaT = Math.abs(D * L * dLam);
        const deltaT_s = deltaT * 1e-12;
        const maxBitRate = 1 / (4 * deltaT_s);

        let bitRateStr;
        if (maxBitRate >= 1e9) {
            bitRateStr = (maxBitRate / 1e9).toFixed(3) + ' Gbps';
        } else if (maxBitRate >= 1e6) {
            bitRateStr = (maxBitRate / 1e6).toFixed(3) + ' Mbps';
        } else {
            bitRateStr = (maxBitRate / 1e3).toFixed(3) + ' kbps';
        }

        // Display results
        document.getElementById('vn-time-disp').textContent = deltaT.toFixed(3) + ' ps';
        document.getElementById('vn-pulse-broad').textContent = deltaT.toFixed(3) + ' ps';
        document.getElementById('vn-max-bitrate').textContent = bitRateStr;
        
        console.log('✅ Dispersion result:', { deltaT, bitRateStr });
    }

    function resetDispersion() {
        document.getElementById('vn-disp-coeff').value = '';
        document.getElementById('vn-fiber-length').value = '';
        document.getElementById('vn-spectral-width').value = '';
        document.getElementById('vn-time-disp').textContent = '-';
        document.getElementById('vn-pulse-broad').textContent = '-';
        document.getElementById('vn-max-bitrate').textContent = '-';
        document.getElementById('vn-error-d').style.display = 'none';
        console.log('🔄 Dispersion reset.');
    }

    // ============================================
    // V-NUMBER - TAB SWITCHING
    // ============================================

    function switchVnTab(mode) {
        console.log('🔀 VN Tab switching to:', mode);
        
        document.querySelectorAll('.vn-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.vn-mode').forEach(m => m.classList.remove('active'));

        const activeTab = document.querySelector(`.vn-tab[data-tab="${mode}"]`);
        const activeMode = document.getElementById('vn-mode-' + mode);

        if (activeTab) activeTab.classList.add('active');
        if (activeMode) activeMode.classList.add('active');
    }

    // ============================================
    // UNIT CONVERTER - dBm TO mW
    // ============================================

    function calculateDbmToMw() {
        console.log('🧮 Calculating dBm → mW...');

        const dBm = parseFloat(document.getElementById('uc-dbm-input')?.value);
        const err = document.getElementById('uc-error-dbm');

        // Validation
        if (isNaN(dBm)) {
            err.textContent = '❌ Please enter a valid dBm value!';
            err.style.display = 'block';
            return;
        }
        err.style.display = 'none';

        // Calculate
        const mW = Math.pow(10, dBm / 10);
        const mwValue = parseFloat(mW.toFixed(6));
        
        // Display result
        document.getElementById('uc-mw-result').textContent = mwValue + ' mW';
        
        console.log('✅ dBm→mW result:', mwValue + ' mW');
    }

    function resetDbmToMw() {
        document.getElementById('uc-dbm-input').value = '10';
        document.getElementById('uc-mw-result').textContent = '-';
        document.getElementById('uc-error-dbm').style.display = 'none';
        console.log('🔄 dBm→mW reset.');
    }

    // ============================================
    // UNIT CONVERTER - mW TO dBm
    // ============================================

    function calculateMwToDbm() {
        console.log('🧮 Calculating mW → dBm...');

        const mW = parseFloat(document.getElementById('uc-mw-input')?.value);
        const err = document.getElementById('uc-error-mw');

        // Validation
        if (isNaN(mW) || mW <= 0) {
            err.textContent = '❌ Please enter a valid mW value (must be > 0)!';
            err.style.display = 'block';
            return;
        }
        err.style.display = 'none';

        // Calculate
        const dBm = 10 * Math.log10(mW);
        const formattedDbm = parseFloat(dBm.toFixed(2));
        
        // Display result
        document.getElementById('uc-dbm-result').textContent = formattedDbm + ' dBm';
        
        console.log('✅ mW→dBm result:', formattedDbm + ' dBm');
    }

    function resetMwToDbm() {
        document.getElementById('uc-mw-input').value = '10';
        document.getElementById('uc-dbm-result').textContent = '-';
        document.getElementById('uc-error-mw').style.display = 'none';
        console.log('🔄 mW→dBm reset.');
    }

    // ============================================
    // UNIT CONVERTER - TAB SWITCHING
    // ============================================

    function switchUcTab(mode) {
        console.log('🔀 UC Tab switching to:', mode);
        
        document.querySelectorAll('.uc-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.uc-mode').forEach(m => m.classList.remove('active'));

        const activeTab = document.querySelector(`.uc-tab[data-tab="${mode}"]`);
        const activeMode = document.getElementById('uc-mode-' + mode);

        if (activeTab) activeTab.classList.add('active');
        if (activeMode) activeMode.classList.add('active');
    }

    // ============================================
    // LINK POWER BUDGET CALCULATOR
    // ============================================

    function calculateLPB() {
        console.log('🧮 Calculating Link Power Budget...');

        const txPower = parseFloat(document.getElementById('lpb-tx-power')?.value) || 0;
        const rxSensitivity = parseFloat(document.getElementById('lpb-rx-sensitivity')?.value) || 0;
        const fiberLength = parseFloat(document.getElementById('lpb-fiber-length')?.value) || 0;
        const lossPerKm = parseFloat(document.getElementById('lpb-loss-per-km')?.value) || 0;
        const connectorLoss = parseFloat(document.getElementById('lpb-connector-loss')?.value) || 0;
        const spliceLoss = parseFloat(document.getElementById('lpb-splice-loss')?.value) || 0;
        const splitterLoss = parseFloat(document.getElementById('lpb-splitter-loss')?.value) || 0;

        // Calculate
        const fiberLoss = fiberLength * lossPerKm;
        const totalLoss = fiberLoss + connectorLoss + spliceLoss + splitterLoss;
        const rxPower = txPower - totalLoss;
        const linkMargin = rxPower - rxSensitivity;
        const powerBudget = txPower - rxSensitivity;

        // Display results
        document.getElementById('lpb-total-loss').textContent = parseFloat(totalLoss.toFixed(2)) + ' dB';
        document.getElementById('lpb-rx-power').textContent = parseFloat(rxPower.toFixed(2)) + ' dBm';
        document.getElementById('lpb-link-margin').textContent = parseFloat(linkMargin.toFixed(2)) + ' dB';
        document.getElementById('lpb-power-budget').textContent = parseFloat(powerBudget.toFixed(2)) + ' dB';

        console.log('✅ LPB result:', { totalLoss, rxPower, linkMargin, powerBudget });
    }

    function resetLPB() {
        document.getElementById('lpb-tx-power').value = '3';
        document.getElementById('lpb-rx-sensitivity').value = '-28';
        document.getElementById('lpb-fiber-length').value = '10';
        document.getElementById('lpb-loss-per-km').value = '0.35';
        document.getElementById('lpb-connector-loss').value = '0.5';
        document.getElementById('lpb-splice-loss').value = '0.1';
        document.getElementById('lpb-splitter-loss').value = '0';
        
        document.getElementById('lpb-total-loss').textContent = '-';
        document.getElementById('lpb-rx-power').textContent = '-';
        document.getElementById('lpb-link-margin').textContent = '-';
        document.getElementById('lpb-power-budget').textContent = '-';
        
        console.log('🔄 LPB reset.');
    }

    // ============================================
    // EVENT DELEGATION
    // ============================================
    
    document.addEventListener('click', function(e) {
        const target = e.target.closest('button');
        if (!target) return;

        switch(target.id) {
            // NA Calculator - Tabs
            case 'tab-refractive':
            case 'tab-diameter':
                e.preventDefault();
                switchTab(target.dataset.tab);
                break;

            // NA Calculator - Calculate
            case 'btn-calc-ref':
                e.preventDefault();
                calculateRefractive();
                break;
            case 'btn-calc-dia':
                e.preventDefault();
                calculateDiameter();
                break;

            // NA Calculator - Reset
            case 'btn-reset-ref':
                e.preventDefault();
                resetRefractive();
                break;
            case 'btn-reset-dia':
                e.preventDefault();
                resetDiameter();
                break;

            // V-Number - Tabs
            case 'vn-tab-vnumber':
            case 'vn-tab-dispersion':
                e.preventDefault();
                switchVnTab(target.dataset.tab);
                break;

            // V-Number - Calculate & Reset
            case 'vn-btn-calc-v':
                e.preventDefault();
                calculateVNumber();
                break;
            case 'vn-btn-reset-v':
                e.preventDefault();
                resetVNumber();
                break;

            // Dispersion - Calculate & Reset
            case 'vn-btn-calc-d':
                e.preventDefault();
                calculateDispersion();
                break;
            case 'vn-btn-reset-d':
                e.preventDefault();
                resetDispersion();
                break;

            // Unit Converter - Tabs
            case 'uc-tab-dbm-to-mw':
            case 'uc-tab-mw-to-dbm':
                e.preventDefault();
                switchUcTab(target.dataset.tab);
                break;

            // Unit Converter - Calculate & Reset
            case 'uc-btn-calc-dbm':
                e.preventDefault();
                calculateDbmToMw();
                break;
            case 'uc-btn-reset-dbm':
                e.preventDefault();
                resetDbmToMw();
                break;
            case 'uc-btn-calc-mw':
                e.preventDefault();
                calculateMwToDbm();
                break;
            case 'uc-btn-reset-mw':
                e.preventDefault();
                resetMwToDbm();
                break;

            // Link Power Budget - Calculate & Reset
            case 'lpb-btn-calculate':
                e.preventDefault();
                calculateLPB();
                break;
            case 'lpb-btn-reset':
                e.preventDefault();
                resetLPB();
                break;
        }
    });

    // ============================================
    // INITIALIZATION
    // ============================================
    
    function init() {
        console.log('🚀 All Calculators initialized!');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Support SPA pageChanged
    document.addEventListener('pageChanged', function(e) {
        console.log('📄 Page changed:', e.detail?.pageId);
        setTimeout(init, 100);
    });

    console.log('✅ All Calculator Event Handlers Registered!');

})();