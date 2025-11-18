// Blocking JavaScript with performance issues

// Synchronous sleep function - blocks main thread
function sleep(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Blocking the main thread
    }
}

// Console spam
console.log('Starting blocking script...');
for (let i = 0; i < 500; i++) {
    console.log(`Blocking script iteration: ${i}`);
}

// Block the main thread for 5 seconds
// console.log('Blocking main thread for 5 seconds...');
// sleep(5000);
// console.log('Main thread unblocked');

// Inefficient DOM manipulation
function inefficientDOMManipulation() {
    console.log('Starting inefficient DOM manipulation');
    
    // Force multiple reflows and repaints
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.innerHTML = `<p>Dynamic content ${i}</p>`;
        div.style.width = i + 'px';
        div.style.height = i + 'px';
        div.style.backgroundColor = `hsl(${i * 3.6}, 100%, 50%)`;
        div.style.position = 'absolute';
        div.style.top = Math.random() * 100 + 'px';
        div.style.left = Math.random() * 100 + 'px';
        
        document.body.appendChild(div);
        
        // Force layout calculation
        div.offsetHeight;
        
        // Remove immediately (wasteful)
        document.body.removeChild(div);
    }
    console.log('Finished inefficient DOM manipulation');
}

// Inefficient animation without requestAnimationFrame
let animationCounter = 0;
function badAnimation() {
    setInterval(() => {
        animationCounter++;
        const elements = document.querySelectorAll('.moving-box, .rotating-element, .scaling-element');
        elements.forEach((el, index) => {
            // Directly manipulating style properties that trigger layout
            el.style.left = (animationCounter + index * 10) % 300 + 'px';
            el.style.width = (50 + Math.sin(animationCounter * 0.1) * 20) + 'px';
            el.style.height = (50 + Math.cos(animationCounter * 0.1) * 20) + 'px';
            
            // Force reflow
            el.offsetHeight;
        });
    }, 16); // Not synced with display refresh rate
}

// Memory leak - event listeners not cleaned up
function setupMemoryLeaks() {
    console.log('Setting up memory leaks');
    
    setInterval(() => {
        const handler = function() {
            console.log('Memory leak handler executed');
        };
        
        // Add event listeners without removing them
        document.addEventListener('click', handler);
        document.addEventListener('scroll', handler);
        document.addEventListener('resize', handler);
        
        // Create closures that reference DOM elements
        const elements = document.querySelectorAll('*');
        const closure = function() {
            return elements.length;
        };
        
        // Store closure in a global array (prevents garbage collection)
        window.memoryLeaks = window.memoryLeaks || [];
        window.memoryLeaks.push(closure);
    }, 1000);
}

// Inefficient regex operations
function inefficientRegex() {
    console.log('Running inefficient regex operations');
    
    const text = 'This is a sample text with email@example.com and another@test.org and more@sample.net';
    
    // Catastrophic backtracking regex
    const badRegex = /^(a+)+$/;
    const testString = 'a'.repeat(20) + 'x';
    
    try {
        for (let i = 0; i < 100; i++) {
            badRegex.test(testString);
        }
    } catch (e) {
        console.log('Regex timeout/error:', e.message);
    }
    
    // Inefficient email validation repeated many times
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    for (let i = 0; i < 1000; i++) {
        emailRegex.test('test@example.com');
    }
}

// Synchronous AJAX requests
function synchronousRequests() {
    console.log('Making synchronous requests');
    
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1', false); // false = synchronous
        xhr.send();
        console.log('Synchronous request completed:', xhr.status);
    } catch (e) {
        console.log('Synchronous request failed:', e.message);
    }
    
    try {
        const xhr2 = new XMLHttpRequest();
        xhr2.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', false);
        xhr2.send();
        console.log('Second synchronous request completed:', xhr2.status);
    } catch (e) {
        console.log('Second synchronous request failed:', e.message);
    }
}

// Inefficient data processing
function inefficientDataProcessing() {
    console.log('Starting inefficient data processing');
    
    // Create large arrays and process them inefficiently
    const largeArray = Array.from({length: 10000}, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: Math.random(),
        data: Array.from({length: 100}, () => Math.random())
    }));
    
    // Inefficient filtering and mapping
    const result = largeArray
        .filter(item => item.value > 0.1)
        .map(item => ({...item, processed: true}))
        .filter(item => item.id % 2 === 0)
        .map(item => ({...item, doubled: item.value * 2}))
        .filter(item => item.doubled > 0.5)
        .map(item => item.name.toUpperCase());
    
    console.log('Processed items:', result.length);
    
    // Nested loops for O(n²) complexity
    let comparisons = 0;
    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 1000; j++) {
            comparisons++;
            if (i === j) {
                // Do something
            }
        }
    }
    console.log('Comparisons made:', comparisons);
}

// Heavy calculations on main thread
function heavyCalculations() {
    console.log('Starting heavy calculations on main thread');
    
    // Calculate prime numbers inefficiently
    function isPrime(n) {
        if (n < 2) return false;
        for (let i = 2; i < n; i++) {
            if (n % i === 0) return false;
        }
        return true;
    }
    
    const primes = [];
    for (let i = 2; i < 10000; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    
    console.log('Found primes:', primes.length);
    
    // Fibonacci calculation with no memoization
    function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    const fibResults = [];
    for (let i = 0; i < 35; i++) {
        fibResults.push(fibonacci(i));
    }
    
    console.log('Fibonacci results:', fibResults.length);
}

// Global variables creating memory pressure
window.globalData = {
    largeArray: Array.from({length: 100000}, (_, i) => ({
        id: i,
        data: `Large string data item ${i} with lots of content to consume memory`,
        moreData: Array.from({length: 100}, () => Math.random())
    })),
    images: [],
    timers: [],
    callbacks: []
};

// Initialize all the bad practices when DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, starting all bad practices');
        inefficientDOMManipulation();
        badAnimation();
        setupMemoryLeaks();
        inefficientRegex();
        synchronousRequests();
        inefficientDataProcessing();
        heavyCalculations();
    });
} else {
    console.log('DOM already loaded, starting all bad practices');
    inefficientDOMManipulation();
    badAnimation();
    setupMemoryLeaks();
    inefficientRegex();
    synchronousRequests();
    inefficientDataProcessing();
    heavyCalculations();
}

// More blocking operations
console.log('Blocking script execution continues...');
for (let i = 0; i < 1000000; i++) {
    // Waste CPU cycles
    Math.sqrt(i);
}

// Final sleep to ensure blocking
// sleep(1000);
console.log('Blocking script finished');