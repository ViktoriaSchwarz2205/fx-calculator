document.querySelectorAll('select').forEach(element => {
    element.innerHTML = `
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CHF">CHF</option>
        <option value="SEK">SEK</option>
        <option value="BTC">BTC</option>
    `;
});

const fixerUri = "fixer.json";

async function convert(inputValue, inputCurrency, outputCurrency) {
    const response = await fetch(fixerUri);
    const data = await response.json();
    const rates = data['rates'];
    rates["EUR"] = 1.;
    return inputValue / rates[inputCurrency] * rates[outputCurrency];
}

document.querySelector('button').addEventListener('click', async () => {        
    const inputCurrency = document.querySelector('[name="input-currency"]').value;
    const outputCurrency = document.querySelector('[name="output-currency"]').value;    
    const inputValue = document.querySelector('[name="input-value"]').value;
    const outputValue = await convert(inputValue, inputCurrency, outputCurrency);
    document.querySelector('[name="output-value"]').value = Math.round(outputValue, 2);            
});

let pwaPrompt;
const prompt = document.querySelector('#pwa-install-prompt');
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    pwaPrompt = e;
    prompt.classList.add('show');
})

prompt.addEventListener('click', function(event) {
    if (event.target.dataset.id === 'pwa-install-y' && pwaPrompt) {
        pwaPrompt.prompt();
        pwaPrompt.userChoice.then(() => {
            prompt.classList.remove('show');
            pwaPrompt = null;
        });
    } else {
        prompt.classList.remove('show');
    }
});