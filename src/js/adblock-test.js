// Authentication check
if (localStorage.getItem('adblockTesterAuth') !== 'true') {
    window.location.href = 'login.html';
}

// AdBlock Test Implementation
document.addEventListener('DOMContentLoaded', function() {
    const startTestButton = document.getElementById('start_test');
    const settingsButton = document.getElementById('settings_btn');
    const testResults = document.getElementById('test_results');
    const testRunning = document.getElementById('test_running');
    const progressBar = document.getElementById('progress_bar');
    const currentTest = document.getElementById('current_test');
    const detailedResults = document.getElementById('detailed_results');
    const scoreText = document.getElementById('score_text');
    const scoreCircle = document.getElementById('score_circle');
    const blockedCount = document.getElementById('blocked_count');
    const totalCount = document.getElementById('total_count');
    const adsScore = document.getElementById('ads_score');
    const trackersScore = document.getElementById('trackers_score');
    const analyticsScore = document.getElementById('analytics_score');

    // Force colors for better visibility regardless of theme
    testResults.style.setProperty('background-color', 'white', 'important');
    testResults.style.setProperty('color', '#333333', 'important');
    
    if (testRunning) {
        testRunning.style.setProperty('background-color', 'white', 'important');
        testRunning.style.setProperty('color', '#333333', 'important');
    }
    
    // Set dark text color for all text in the results container
    const forceDarkText = () => {
        const elements = testResults.querySelectorAll('*');
        elements.forEach(el => {
            el.style.setProperty('color', '#333333', 'important');
        });
        
        // Fix domain results specifically
        const domainResults = detailedResults.querySelectorAll('.domain-result');
        domainResults.forEach(result => {
            result.style.setProperty('background-color', '#f8f8f8', 'important');
            result.style.setProperty('border', '1px solid #e0e0e0', 'important');
            result.style.setProperty('margin-bottom', '5px', 'important');
            result.style.setProperty('padding', '10px', 'important');
            
            // Set proper colors for status indicators
            const status = result.querySelector('.domain-status');
            if (status) {
                if (status.textContent.includes('✓')) {
                    status.style.setProperty('color', '#22c55e', 'important'); // Green
                } else {
                    status.style.setProperty('color', '#ef4444', 'important'); // Red
                }
                status.style.setProperty('font-weight', 'bold', 'important');
            }
        });
    };

    // Test domains by category
    const testDomains = {
        ads: [
            { name: 'Google Ads', domain: 'pagead2.googlesyndication.com' },
            { name: 'DoubleClick', domain: 'doubleclick.net' },
            { name: 'AdSense', domain: 'adservice.google.com' },
            { name: 'Media.net', domain: 'media.net' },
            { name: 'Amazon Ads', domain: 'adtago.s3.amazonaws.com' },
            { name: 'Taboola', domain: 'cdn.taboola.com' },
            { name: 'Outbrain', domain: 'widgets.outbrain.com' },
            { name: 'PopAds', domain: 'popads.net' },
            { name: 'Propeller Ads', domain: 'propellerads.com' },
            { name: 'AdMob', domain: 'admob.com' }
        ],
        trackers: [
            { name: 'Google Analytics', domain: 'google-analytics.com' },
            { name: 'Facebook Pixel', domain: 'connect.facebook.net' },
            { name: 'Twitter Analytics', domain: 'static.ads-twitter.com' },
            { name: 'Criteo', domain: 'static.criteo.net' },
            { name: 'Hotjar', domain: 'static.hotjar.com' },
            { name: 'Pinterest Tag', domain: 'ct.pinterest.com' },
            { name: 'Adobe Analytics', domain: 'dpm.demdex.net' },
            { name: 'LinkedIn Insight', domain: 'snap.licdn.com' },
            { name: 'TikTok Pixel', domain: 'analytics.tiktok.com' },
            { name: 'Mouseflow', domain: 'cdn.mouseflow.com' }
        ],
        analytics: [
            { name: 'Google Tag Manager', domain: 'googletagmanager.com' },
            { name: 'Segment', domain: 'cdn.segment.com' },
            { name: 'Amplitude', domain: 'cdn.amplitude.com' },
            { name: 'Mixpanel', domain: 'cdn.mxpnl.com' },
            { name: 'Matomo', domain: 'cdn.matomo.cloud' },
            { name: 'Heap Analytics', domain: 'cdn.heapanalytics.com' },
            { name: 'Clarity', domain: 'clarity.ms' },
            { name: 'Plausible', domain: 'plausible.io' },
            { name: 'SimpleAnalytics', domain: 'scripts.simpleanalyticscdn.com' },
            { name: 'Kissmetrics', domain: 'scripts.kissmetrics.io' }
        ]
    };

    // Test a single domain
    async function testDomain(domain) {
        return new Promise(resolve => {
            const img = new Image();
            img.src = `https://${domain}/favicon.ico?${Math.random()}`;
            img.onload = () => resolve(false); // Image loaded = not blocked
            img.onerror = () => resolve(true); // Error loading = blocked
            setTimeout(() => resolve(true), 2000); // Timeout = assume blocked
        });
    }

    // Run all tests
    async function runTests() {
        // Show test running UI
        testRunning.style.display = 'block';
        testResults.style.display = 'none';
        
        // Prepare results object
        const results = {
            ads: { blocked: 0, total: testDomains.ads.length },
            trackers: { blocked: 0, total: testDomains.trackers.length },
            analytics: { blocked: 0, total: testDomains.analytics.length }
        };
        
        // Calculate total domains
        const totalDomains = Object.values(testDomains).reduce((sum, category) => sum + category.length, 0);
        let testedDomains = 0;

        // Generate HTML for results
        let resultsHTML = '';
        
        // Test each category
        for (const [category, domains] of Object.entries(testDomains)) {
            resultsHTML += `<div class="category-results">
                <h3 style="color: #333333 !important;">${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <div class="domain-list">`;
                
            for (const domainInfo of domains) {
                // Update progress
                testedDomains++;
                const progress = (testedDomains / totalDomains) * 100;
                progressBar.style.width = `${progress}%`;
                currentTest.textContent = `Testing ${domainInfo.name} (${domainInfo.domain})`;
                
                // Test the domain
                const isBlocked = await testDomain(domainInfo.domain);
                if (isBlocked) {
                    results[category].blocked++;
                }
                
                // Add to results HTML
                resultsHTML += `<div class="domain-result ${isBlocked ? 'blocked' : 'not-blocked'}" style="background-color: #f8f8f8 !important; color: #333333 !important; border: 1px solid #e0e0e0; margin-bottom: 5px; padding: 10px;">
                    <span class="domain-name" style="color: #333333 !important; font-weight: bold;">${domainInfo.name}</span>
                    <span class="domain-url" style="color: #333333 !important;">${domainInfo.domain}</span>
                    <span class="domain-status" style="color: ${isBlocked ? '#22c55e' : '#ef4444'} !important; font-weight: bold;">${isBlocked ? '✓ Blocked' : '✗ Not Blocked'}</span>
                </div>`;
            }
            
            resultsHTML += `</div></div>`;
        }
        
        // Calculate total score
        const totalBlocked = Object.values(results).reduce((sum, category) => sum + category.blocked, 0);
        const totalTests = Object.values(results).reduce((sum, category) => sum + category.total, 0);
        const overallScore = Math.round((totalBlocked / totalTests) * 100);
        
        // Update UI
        scoreText.textContent = `${overallScore}%`;
        blockedCount.textContent = totalBlocked;
        totalCount.textContent = totalTests;
        adsScore.textContent = `${Math.round((results.ads.blocked / results.ads.total) * 100)}%`;
        trackersScore.textContent = `${Math.round((results.trackers.blocked / results.trackers.total) * 100)}%`;
        analyticsScore.textContent = `${Math.round((results.analytics.blocked / results.analytics.total) * 100)}%`;
        
        // Set score circle color based on score
        if (overallScore >= 80) {
            scoreCircle.style.borderColor = '#22c55e'; // Green
        } else if (overallScore >= 50) {
            scoreCircle.style.borderColor = '#eab308'; // Yellow
        } else {
            scoreCircle.style.borderColor = '#ef4444'; // Red
        }
        
        // Update detailed results
        detailedResults.innerHTML = resultsHTML;
        
        // Show results
        testRunning.style.display = 'none';
        testResults.style.display = 'block';
        
        // Apply dark text to all elements
        forceDarkText();
    }

    // Event listeners
    startTestButton.addEventListener('click', runTests);
    settingsButton.addEventListener('click', function() {
        // Settings functionality could be implemented here
        alert('Settings feature is not available in this version.');
    });
});

// Add CSS for the test
const style = document.createElement('style');
style.textContent = `
.score-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 10px solid #22c55e;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
}

.score-circle span {
    font-size: 24px;
    font-weight: bold;
    color: #333333 !important;
}

.results-summary {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
}

.results-details {
    flex: 1;
}

.results-details p {
    color: #333333 !important;
}

.results-details strong {
    color: #333333 !important;
}

.progress-container {
    height: 20px;
    background-color: #e5e7eb;
    border-radius: 10px;
    margin: 20px 0;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background-color: #3b82f6;
    width: 0;
    transition: width 0.3s;
}

.domain-result {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #e5e7eb;
    color: #333333 !important;
    background-color: #f8f8f8 !important;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
}

.domain-name, .domain-url {
    color: #333333 !important;
}

.domain-name {
    font-weight: bold;
}

.domain-result.blocked .domain-status {
    color: #22c55e !important;
    font-weight: bold;
}

.domain-result.not-blocked .domain-status {
    color: #ef4444 !important;
    font-weight: bold;
}

.category-results {
    margin-bottom: 20px;
}

.category-results h3 {
    color: #333333 !important;
    margin-bottom: 10px;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 5px;
}

.detailed-results {
    color: #333333 !important;
}

#test_results h2 {
    color: #333333 !important;
}

#current_test {
    color: #333333 !important;
}

@media (max-width: 768px) {
    .results-summary {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .domain-result {
        flex-direction: column;
    }
}

.btn-primary, .btn-secondary {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    margin-right: 8px;
}

.btn-primary {
    background-color: #3b82f6;
    color: white !important;
}

.btn-secondary {
    background-color: #e5e7eb;
    color: #1f2937 !important;
}

#test_running h2 {
    color: #333333 !important;
}
`;
document.head.appendChild(style); 