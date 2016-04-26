(function() {
    function $_id(id) {
        return document.getElementById(id);
    }
    function show(dom) {
        dom.style.display = "block";
    }
    function hide(dom) {
        dom.style.display = "none";
    }

    chrome.tabs.getSelected(null, function(tab) {
        var favicon_dom = $_id("favicon");
        var qrcode_dom = $_id("qrcode");

        favicon_dom.onerror = function() {
            favicon_dom.src = "res/icon_32.png";
            favicon_dom.onerror = null;
        }
        if (tab.favIconUrl) {
            favicon_dom.src = tab.favIconUrl;
            show(favicon_dom);
        }
        var url = tab.url || "http://www.atool.org/";
        var options = get_qrcode_option(url);
        
        try { 
            qrcode_dom.src = qrgen.canvas(options).toDataURL();
        } catch (e) {
        }
        // 请求获取短网址
        url = encodeURI(url);
        $.getJSON(
            'http://hust.cc/shorten?url=' + url,
            function (data) {
                if (data.status == 1) {
                    options.data = data.s_url;
                    try { 
                        qrcode_dom.src = qrgen.canvas(options).toDataURL();
                    } catch (e) {
                    }
                } else {
                }
            }
        );
    });
})();