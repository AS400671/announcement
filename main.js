(() => {
    fetch("https://cdn.jsdelivr.net/gh/AS400671/announcement/announce.json")
    .then(r=>r.json())
    .then(r=>{
        let domPrefixList = document.createElement("ul")
        for(let prefix_name of Object.keys(r.prefixes)){

            let domPrefixItem = document.createElement("li")
            // Populate List
            let domPrefixName = document.createElement("b")
            let domPrefixCountry = document.createElement("span")
            let domPrefixProvider = document.createElement("small")
            // Write
            domPrefixName.append(prefix_name + " ")
            domPrefixCountry.classList.add("flag-icon")
            if(r.prefixes[prefix_name].type == "anycast"){
                domPrefixCountry.classList.add("flag-icon-un")
                domPrefixProvider.append("Anycasted Network")
            }else{
                domPrefixCountry.classList.add("flag-icon-" + r.prefixes[prefix_name].region)
                domPrefixProvider.append(r.prefixes[prefix_name].provider)
            }
            // Render
            domPrefixItem.appendChild(domPrefixName)
            domPrefixItem.appendChild(domPrefixCountry)
            domPrefixItem.appendChild(document.createElement("br"))
            domPrefixItem.appendChild(domPrefixProvider)
            // Add to list
            domPrefixList.appendChild(domPrefixItem)
        }
        document.querySelector(".list-prefix").appendChild(domPrefixList)

        let domExchangeList = document.createElement("ul")
        for(let exchange_name of Object.keys(r.exchanges)){
            let domExchangeItem = document.createElement("li")
            // Populate List
            let domExchangeName = document.createElement("b")
            let domExchangeCountry = document.createElement("span")
            let domExchangeIP = document.createElement("small")
            // Write
            domExchangeName.append(exchange_name + " ")
            domExchangeCountry.classList.add("flag-icon")
            domExchangeCountry.classList.add("flag-icon-" + r.exchanges[exchange_name].region)
            if(r.exchanges[exchange_name].ipv4){
                domExchangeIP.append(r.exchanges[exchange_name].ipv4 + ", ")
            }
            domExchangeIP.append(r.exchanges[exchange_name].ipv6)
            // Render
            domExchangeItem.appendChild(domExchangeName)
            domExchangeItem.appendChild(domExchangeCountry)
            domExchangeItem.appendChild(document.createElement("br"))
            domExchangeItem.appendChild(domExchangeIP)
            // Add to list
            domExchangeList.appendChild(domExchangeItem)
        }
        document.querySelector(".list-exchange").appendChild(domExchangeList)
    });

    const toggleButton = document.querySelector("#toggle-button")
    toggleButton.addEventListener("change", () => {
        let html = document.body.parentElement
        html.classList.toggle("dark-mode")
        localStorage.setItem("dark-mode", html.classList.contains("dark-mode"))
    });

    let dark_mode = localStorage.getItem("dark-mode")
    if(dark_mode == "true"){
         toggleButton.click()
    }
})();
