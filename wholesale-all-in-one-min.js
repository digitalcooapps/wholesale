/**
 * VERSION: 0.0.2
 * UPDATED: May 08, 2020
 * DO NOT MODIFY - THIS FILE WILL BE UPDATED THROUGH WHOLESALE ALL IN ONE APP AUTOMATICALLY (WHEN UPDATE AVAILABLE).
 * Custom work file (snippets/wholesale-all-in-one.liquid)
**/

WSAIO.init = function($){
    var $ws = this;
    WSAIO.DiscountCode =  {};
    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype,"findIndex",{value:function(c,d){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),e=b.length>>>0;if("function"!==typeof c)throw new TypeError("predicate must be a function");for(var a=0;a<e;){if(c.call(d,b[a],a,b))return a;a++}return-1},configurable:!0,writable:!0});
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf=function(d,e){if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;var a=e|0;if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;a++)if(a in c&&c[a]===d)return a;return-1};
    }
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype,"find",{value:function(c,e){if(null==this)throw TypeError('"this" is null or not defined');var b=Object(this),f=b.length>>>0;if("function"!==typeof c)throw TypeError("predicate must be a function");for(var a=0;a<f;){var d=b[a];if(c.call(e,d,a,b))return d;a++}},configurable:!0,writable:!0});
    }

    function log(a){
        if(["log","info","error","warn","Log","Info","Error","Warn"].indexOf($ws.log)>-1){console[$ws.log.toLowerCase()]("WSAIO "+$ws.log.toUpperCase()+" LOG!",a)}
    }

    function isError(a){
        if(["log","info","error","warn","Log","Info","Error","Warn"].indexOf($ws.errorLog)>-1){console[$ws.errorLog]("WSAIO ERROR LOG!",a)}
    }

    WSAIO.mF = function(a){if(isNaN(a)||null==a)return 0;a=a.toString();if("string"==typeof a&&-1<a.indexOf("."))return 2>a.split(".")[1].length?Number(a).toFixed(2).toString():a.toString();a=(Number(a)/100).toFixed(2);return a.toString()};

    WSAIO.formatMoney = function(a,g){function b(a,c,b,d){b=b||",";d=d||".";if(isNaN(a)||null===a)return 0;a=(a/100).toFixed(c);a=a.split(".");return a[0].replace(/(d)(?=(ddd)+(?!d))/g,"$1"+b)+(a[1]?d+a[1]:"")}"string"===typeof a&&(a=a.replace(".",""));var c="",e=/\{\{\s*(\w+)\s*\}\}/,f=g||$ws.shopInfo.money_format||"${{amount}}";switch(f.match(e)[1]){case "amount":c=b(a,2);break;case "amount_no_decimals":c=b(a,0);break;case "amount_with_comma_separator":c=b(a,2,".",",");break;case "amount_no_decimals_with_comma_separator":c=b(a,0,".",",");break;case "amount_no_decimals_with_space_separator":c=b(a,0," ");break;case "amount_with_apostrophe_separator":c=b(a,2,"'")}return f.replace(e,c)};

    WSAIO.displayTable = function(a,b){if("undefined"===typeof b)return isError("Volume discount table selector for product page was not defined.");if(-1<b.indexOf(":")){var d=b.split(":")[1];var c=b.split(":")[0];switch(d){case "append":$(c).append(a);break;case "prepend":$(c).prepend(a);break;case "before":$(a).insertBefore(c);break;case "after":$(a).insertAfter(c);break;default:$(c).html(a)}}else $(b).html(a)};

    WSAIO.alterHTML = function(a,b){if("undefined"===typeof b)return isError("Selector was not defined.");if(-1<b.indexOf(":")){var d=b.split(":")[1];var c=b.split(":")[0];switch(d){case "append":$(c).append(a);break;case "prepend":$(c).prepend(a);break;case "before":$(a).insertBefore(c);break;case "after":$(a).insertAfter(c);break;default:$(c).html(a)}}else $(b).html(a)};

    WSAIO.DiscountCode.addForm = function(html,selector){$ws.alterHTML(html||$ws.discount_code_form_html,selector||$ws.discount_code_field_selector);}

    WSAIO.DiscountCode.toggle = function(state){if('undefined'===typeof state)var state='show';if($ws.discount_code_field_selector.indexOf(':')>-1){(state==='show'?($($ws.discount_code_field_selector.split(":")[0]).show()):($($ws.discount_code_field_selector.split(":")[0]).hide()));}else{(state==='show'?($($ws.discount_code_field_selector).show()):($($ws.discount_code_field_selector).hide()));}}

    WSAIO.checkCustomer = function(type,tags,excluded){
        switch (type) {
            case 'has_tag':
                $ws.applied_tag = "has_tag";
                if ($ws.customer.id) {
                    var isTag_all = tags.indexOf("all");
                    var isTag_has_account = tags.indexOf("has_account");
                    var isTag = tags.map(function(tag){ return $ws.customer.tags.indexOf(tag.toLowerCase()) > -1 });
                    if(isTag.indexOf(true) > -1){
                        $ws.applied_tag = tags[isTag.indexOf(true)];
                        return isTag.indexOf(true) > -1
                    }
                    else if(isTag_all > -1){
                        $ws.applied_tag = 'all';
                        return true;
                    }
                    else if(isTag_has_account > -1){
                        $ws.applied_tag = 'has_account';
                        return true;
                    }
                    else{
                        return isTag.indexOf(true) > -1
                    }
                }
                else {
                    var isTag_all = tags.indexOf("all");
                    var isTag_no_account = tags.indexOf("no_account");
                    if(isTag_no_account > -1){
                        $ws.applied_tag = 'no_account';
                        return true;
                    }
                    else if(isTag_all > -1){
                        $ws.applied_tag = 'all';
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                break;
            case 'has_account':
                $ws.applied_tag = "has_account";
                if ($ws.customer.id) {
                    var isTag = excluded.map(function(tag){ return $ws.customer.tags.indexOf(tag.toLowerCase()) > -1 });
                    if(isTag.indexOf(true) > -1){
                        $ws.excluded_tag = excluded[isTag.indexOf(true)];
                    }
                    return isTag.indexOf(true) === -1
                } else return false; break;
            case 'no_account':
                $ws.applied_tag = "no_account";
                return $ws.customer.id ? false : true;break;
            case 'all':
                $ws.applied_tag = "all";
                if ($ws.customer.id) {
                    var isTag = excluded.map(function(tag){ return $ws.customer.tags.indexOf(tag.toLowerCase()) > -1 });
                    if(isTag.indexOf(true) > -1){
                        $ws.excluded_tag = excluded[isTag.indexOf(true)];
                    }
                    return isTag.indexOf(true) === -1
                } else return true; break;
            default:
                $ws.applied_tag = "all";
                if ($ws.customer.id) {
                    var isTag = excluded.map(function(tag){ return $ws.customer.tags.indexOf(tag.toLowerCase()) > -1 });
                    if(isTag.indexOf(true) > -1){
                        $ws.excluded_tag = excluded[isTag.indexOf(true)];
                    }
                    return isTag.indexOf(true) === -1
                } else return true; break;
        }
    };

    WSAIO.checkAppliesTo = function(params,callback){
        switch (params.type) {
            case "products":
                params.rule["priority"] = 1;
                applies_to_products();
                break;
            case "collections":
                params.rule["priority"] = 2;
                applies_to_collections();
                break;
            case "entire_store":
                params.rule["priority"] = 3;
                if(params.module === "regular_discount"){
                    $ws.productRd.push(params.rule);
                }
                else{
                    $ws.productVd.push(params.rule);
                }
                break;
            default:
                params.rule["priority"] = 3;
                if(params.module === "regular_discount"){
                    $ws.productRd.push(params.rule);
                }
                else{
                    $ws.productVd.push(params.rule);
                }
                break;
        }
        function applies_to_products(){
            // Apply only if selected_product_id was defined.
            if ('undefined' !== typeof $ws.selected_product.handle || 'undefined' !== typeof $ws.selected_product.id){
                var isFound = params.rule.products.findIndex(function(x){ return (x.handle === $ws.selected_product.handle || x.id == $ws.selected_product.id) })
                if(isFound > -1){
                    if(params.module === "regular_discount"){
                        if(params.rule.products[isFound].variant_level===true){
                            $ws.productRd = [];
                        }
                        $ws.productRd.push(params.rule);
                    }
                    else{
                        if(params.rule.products[isFound].variant_level===true){
                            $ws.productVd = [];
                        }
                        $ws.productVd.push(params.rule);
                    }
                }
            }
            else{
                isError("Selected product handle is not defined.");
            }
        }
        function applies_to_collections(){
            var isFound = [false];
            // if selected_product_id is defined
            if ($ws.selected_product.handle){
                isFound = params.rule.collections.map(function(collection,i){
                    return -1<($ws.product_in_collects.findIndex(function(x){return (x.product_handle == $ws.selected_product.handle || x.product_id == $ws.selected_product.id) && x.collection_id == collection.id }))
                });
                if(isFound.indexOf(true) > -1){
                    if(params.module === "regular_discount"){
                        $ws.productRd.push(params.rule);
                    }
                    else{
                        $ws.productVd.push(params.rule);
                    }
                }
            }
            // if only selected_collection.id is defined.
            else if($ws.template === "collection" && $ws.selected_collection.id){
                // $ws.selected_collection.id (if template is collection then this id contains current collection id, otherwise null). for other case
                isFound = params.rule.collections.map(function(collection,i){
                    return collection.id == $ws.selected_collection.id;
                });
                if(isFound.indexOf(true) > -1){
                    if(params.module === "regular_discount"){
                        $ws.productRd.push(params.rule);
                    }
                    else{
                        $ws.productVd.push(params.rule);
                    }
                }
            }
            else{
                isError("Missing either product_id or collection_id or template is not set for collections"); 
            }
        }
        if($ws.productRd && $ws.productRd.length > 1){
            if(-1<$ws.productRd.findIndex(function(z){ return z.customer_group === 'has_tag' })){
                $ws.productRd = $ws.productRd.filter(function(x){ return x.customer_group === 'has_tag' });
            }
            if(-1<$ws.productRd.findIndex(function(z){ return z.customer_group === 'has_account' })){
                $ws.productRd = $ws.productRd.filter(function(x){ return x.customer_group === 'has_account' });
            }
            if(-1<$ws.productRd.findIndex(function(z){ return z.customer_group === 'no_account' })){
                $ws.productRd = $ws.productRd.filter(function(x){ return x.customer_group === 'no_account' });
            }
        }
        if($ws.productVd && $ws.productVd.length > 1){
            if(-1<$ws.productVd.findIndex(function(z){ return z.customer_group === 'has_tag' })){
                $ws.productVd = $ws.productVd.filter(function(x){ return x.customer_group === 'has_tag' });
            }
            if(-1<$ws.productVd.findIndex(function(z){ return z.customer_group === 'has_account' })){
                $ws.productVd = $ws.productVd.filter(function(x){ return x.customer_group === 'has_account' });
            }
            if(-1<$ws.productVd.findIndex(function(z){ return z.customer_group === 'no_account' })){
                $ws.productVd = $ws.productVd.filter(function(x){ return x.customer_group === 'no_account' });
            }
        }
    };

    WSAIO.volumeDiscount = function(params, callback){
        if(typeof params === 'function')callback=params;
        $ws.output = true;
        $ws.remove_duplicate_table = false;
        $ws.selected_variant = JSON.parse(JSON.stringify($ws.current_variant));// current variant obj should not change
        $ws.selected_product = JSON.parse(JSON.stringify($ws.current_product));// current product obj should not change
        $ws.selected_collection = JSON.parse(JSON.stringify($ws.current_collection));// current collection obj should not change
        if(typeof params === 'object'){
            if(typeof params.product_id !== 'undefined' && params.product_id !== "default") $ws.selected_product.id = params.product_id;
            if(typeof params.product_handle !== 'undefined' && params.product_handle !== "default") $ws.selected_product.handle = params.product_handle;
            if(typeof params.variant_id !== 'undefined' && params.variant_id !== "default") $ws.selected_variant.id = params.variant_id;
            if(typeof params.variant_sku !== 'undefined' && params.variant_sku !== "default") $ws.selected_variant.sku = params.variant_sku;
            if(typeof params.variant_price !== 'undefined' && params.variant_price !== "default") $ws.selected_variant.price = params.variant_price;
            if(typeof params.variant_compare_at_price !== 'undefined' && params.variant_compare_at_price !== "default") $ws.selected_variant.compare_at_price = params.variant_compare_at_price;
            if(typeof params.collection_id !== 'undefined' && params.collection_id !== "default") $ws.selected_collection.id = params.collection_id;
            if(typeof params.output !== 'undefined' && params.output !== "default") $ws.output = params.output;
            if(typeof params.qb_table_selector !== 'undefined' && params.qb_table_selector !== "default") $ws.product_qb_table_selector = params.qb_table_selector;
            if(typeof params.remove_duplicate_table !== 'undefined' && params.remove_duplicate_table !== "default") $ws.remove_duplicate_table = params.remove_duplicate_table;
        	if(typeof params.template !== 'undefined' && params.template !== "default") $ws.landingTemplate = params.template;
        }
        $ws.productVd = [];
        // for loop
        for (var i = 0, len_i = $ws.volume_discounts.length; i < len_i; i++) {
            var volume_discount = $ws.volume_discounts[i];
            if(volume_discount.state !== 'published') continue;
            if($ws.checkCustomer(volume_discount.customer_group,volume_discount.tags, volume_discount.tags_excluded) === false) continue;
            $ws.checkAppliesTo({
                "type" : volume_discount.applies_to,
                "rule" : volume_discount,
                "module" : "volume_discount"
            });
        }// end for loop
        if($ws.productVd.length > 0){
            // sort array by priority
            $ws.productVd.sort(function(a,b){return Number(a.priority) - Number(b.priority)});
            // if this array contains multiple applies to, then filter by products or by collection, to exclude extra rules.
            if(-1<$ws.productVd.findIndex(function(x){ return x.applies_to == "products" })){
                $ws.productVd = $ws.productVd.filter(function(x){ return x.applies_to === "products" });
            }
            else if(-1<$ws.productVd.findIndex(function(x){ return x.applies_to == "collections" })){
                $ws.productVd = $ws.productVd.filter(function(y){ return y.applies_to === "collections" });
            }
        }
        else{
            if(typeof callback === 'function'){
                return callback({
                    info: {
                        product: ["has no discount"],
                    },
                    product_handle: $ws.selected_product.handle,
                    product_id: $ws.selected_product.id,
                    collection_id: $ws.selected_collection.id
                }, null)
            }
        }
        $ws.product_qb = [];
        $ws.product_volume_discount = {};
        // for loop
        for (var j = 0, len_j = $ws.productVd.length; j < len_j; j++) {
            var vd_rule = $ws.productVd[j];
            if("products" === vd_rule.applies_to && vd_rule.individual_product === true){
                vd_rule.products.forEach(function(product,pIndex){
                    if(product.handle === $ws.selected_product.handle || product.id == $ws.selected_product.id){
                        if($ws.product_volume_discount.handle !== product.handle){
                            $ws.product_volume_discount = JSON.parse(JSON.stringify(vd_rule));
                            $ws.product_volume_discount["product"] = product;
                        }
                        if(product.variant_level){
                            product.variants.forEach(function(variant,vIndex){
                                var vIn = variant.tag_options.findIndex(function(apt){ return apt.name.toString().toLowerCase() == $ws.applied_tag.toString().toLowerCase()});
                                if(vIn > -1 && (variant.id == $ws.selected_variant.id || variant.sku == $ws.selected_variant.sku)){
                                    var v_tag_option = variant.tag_options[vIn];
                                    $ws.product_qb.push({
                                        name: v_tag_option.name,
                                        value: v_tag_option.value,
                                        type: v_tag_option.type,
                                        qty: variant.quantity
                                    });
                                }
                            });
                        }
                        else{
                            var pIn = product.tag_options.findIndex(function(apt){ return apt.name.toString().toLowerCase() == $ws.applied_tag.toString().toLowerCase()});
                            if(pIn>-1) {
                                var tag_option = product.tag_options[pIn];
                                $ws.product_qb.push({
                                    name: tag_option.name,
                                    value: tag_option.value,
                                    type: tag_option.type,
                                    qty: product.quantity
                                });
                            }
                        }
                    }
                });
            }
            else{
                vd_rule.volume_discount.forEach(function(vd,vdIndex){
                    $ws.product_qb.push({
                        name: vd_rule.applies_to,
                        value: vd.value,
                        type: vd_rule.discount_type,
                        qty: vd.qty
                    })
                });
                $ws.product_volume_discount = JSON.parse(JSON.stringify(vd_rule));
                if(vd_rule.applies_to === "collections"){
                    $ws.product_volume_discount["collections"] = $ws.product_volume_discount.collections.filter(function(c){ return c.id == $ws.selected_collection.id });
                }
            }
        }
        $ws.product_volume_discount["volume_discount"] = JSON.parse(JSON.stringify($ws.product_qb));
        // if TRUE, app will alter prices. our app will output price and compare at price
        if($ws.output){
            if($ws.landingTemplate === "product"){
                if(typeof $ws.product_volume_discount === 'undefined') isError("Volume discount table could not created. Because the rule is empty or not defined. Reference variable is WSAIO.product_volume_discount.");
                switch ($ws.product_volume_discount.display_option) {
                    case "detailed_grid":
                        $ws.detailed_grid_table($ws.product_volume_discount, params);
                        break;
                    case "basic_grid":
                        $ws.basic_grid_table($ws.product_volume_discount, params);
                        break;
                    case "grid_range":
                        $ws.grid_range_table($ws.product_volume_discount, params);
                        break;
                    case "detailed_grid_percent":
                        $ws.detailed_grid_percent_table($ws.product_volume_discount, params);
                        break;
                    case "percent_grid":
                        $ws.percent_grid_table($ws.product_volume_discount, params);
                        break;
                    case "grid_range_alternate":
                        $ws.grid_range_alternate_table($ws.product_volume_discount, params);
                        break;
                    default:
                        $ws.grid_range_alternate_table($ws.product_volume_discount, params);
                    break;
                }
            }
            else{
                var value_range = [];
                $ws.product_volume_discount.volume_discount.forEach( function(v){
                    value_range.push(Number(v.value));
                });
                var min = Math.min.apply(null, value_range);
                var max = Math.max.apply(null, value_range);
                // log("Min discount: "+ min);
                // log("Max discount: "+ max);
                var max_discount_index = $ws.product_volume_discount.volume_discount.findIndex(function(b){ return b.value == max });
                if(max_discount_index > -1){
                    var max_discount = $ws.product_volume_discount.volume_discount[max_discount_index];
                    var price = Number($ws.mF(Number($ws.selected_variant.price)));
                    var discount = $ws.get_discount(price, max_discount.type, max_discount.value);
                    if(Number(discount) == 0 || (Number(price) == 0)){ return null; }
                    var compare_at_price = $ws.selected_variant.price;
                    if($ws.general_settings.show_compare_at_price){
                        compare_at_price = $ws.selected_variant.compare_at_price;
                    }
                    if(isNaN($ws.selected_variant.compare_at_price)||(Number($ws.selected_variant.compare_at_price)<=Number($ws.selected_variant.price))){
                        compare_at_price = 0;
                        if((Number(price)-Number(discount)) < Number(price)){
                            compare_at_price = Number(price).toFixed(2);
                        }
                    }
                    var regular_price = $ws.formatMoney((Number(price)-Number(discount)).toFixed(2));
                    compare_at_price = $ws.formatMoney(compare_at_price);
                    if(Number(compare_at_price) < 1){
                        compare_at_price = "";
                    }
                    if(!$ws.general_settings.compare_at_price){
                        compare_at_price = "";
                    }
                    var html = '';
                    if($ws.template === 'product'){
                        html = $ws.product_price_html;
                    }
                    else{
                        html = $ws.hcsr_price_html;
                    }
                    html = html
                    .replace(new RegExp("%regular_price%","gi"), regular_price)
                    .replace(new RegExp("%compare_at_price%","gi"), compare_at_price);
                    $ws.alterHTML(html, $ws.product_id_selector.replace("%id%",$ws.selected_product.id));
                    try {
                        // we remove selector bcz, volume discount has been applied on this variant, so that regular discount could not alter the price
                        var el = $ws.product_id_selector.replace("%id%",$ws.selected_product.id).split(":")[0];
                        $(el).removeClass(el.replace(".",""))
                    } catch (error) {
                        isError(error)
                    }
                }
            }
            
        }
        // response back
        if(typeof callback === 'function'){
            return callback(null, {
                quantity_breaks: $ws.product_qb,
                product: $ws.selected_product,
                variant: $ws.selected_variant
            });
        }
        // end for loop
    };//end volumeDiscount

    WSAIO.regularDiscount = function(params, callback){
        if(typeof params === 'function')callback=params;
        $ws.output = true;
        $ws.remove_duplicate_table = false;
        $ws.selected_variant = JSON.parse(JSON.stringify($ws.current_variant));// current variant obj should not change
        $ws.selected_product = JSON.parse(JSON.stringify($ws.current_product));// current product obj should not change
        $ws.selected_collection = JSON.parse(JSON.stringify($ws.current_collection));// current collection obj should not change
        if(typeof params === 'object'){
            if(typeof params.product_id !== 'undefined' && params.product_id !== "default") $ws.selected_product.id = params.product_id;
            if(typeof params.product_handle !== 'undefined' && params.product_handle !== "default") $ws.selected_product.handle = params.product_handle;
            if(typeof params.variant_id !== 'undefined' && params.variant_id !== "default") $ws.selected_variant.id = params.variant_id;
            if(typeof params.variant_sku !== 'undefined' && params.variant_sku !== "default") $ws.selected_variant.sku = params.variant_sku;
            if(typeof params.variant_price !== 'undefined' && params.variant_id !== "default") $ws.selected_variant.price = params.variant_price;
            if(typeof params.variant_compare_at_price !== 'undefined' && params.variant_sku !== "default") $ws.selected_variant.compare_at_price = params.variant_compare_at_price;
            if(typeof params.collection_id !== 'undefined' && params.collection_id !== "default") $ws.selected_collection.id = params.collection_id;
            if(typeof params.output !== 'undefined' && params.output !== "default") $ws.output = params.output;
            if(typeof params.remove_duplicate_table !== 'undefined' && params.remove_duplicate_table !== "default") $ws.remove_duplicate_table = params.remove_duplicate_table;
            if(typeof params.template !== 'undefined' && params.template !== "default") $ws.landingTemplate = params.template;
        }
        $ws.productRd = [];
        // for loop
        for (var i = 0, len_i = $ws.regular_discounts.length; i < len_i; i++) {
            var regular_discount = $ws.regular_discounts[i];
            if(regular_discount.state !== 'published') continue;
            if($ws.checkCustomer(regular_discount.customer_group,regular_discount.tags, regular_discount.tags_excluded) === false) continue;
            $ws.checkAppliesTo({
                "type" : regular_discount.applies_to,
                "rule" : regular_discount,
                "module" : "regular_discount"
            });
        }// end for loop
        if($ws.productRd.length > 0){
            // sort array by priority
            $ws.productRd.sort(function(a,b){return Number(a.priority) - Number(b.priority)});
            // if this array contains multiple applies to, then filter by products or by collection, to exclude extra rules.
            if(-1<$ws.productRd.findIndex(function(x){ return x.applies_to == "products" })){
                $ws.productRd = $ws.productRd.filter(function(x){ return x.applies_to === "products" });
            }
            else if(-1<$ws.productRd.findIndex(function(x){ return x.applies_to == "collections" })){
                $ws.productRd = $ws.productRd.filter(function(y){ return y.applies_to === "collections" });
            }
        }
        else{
            if(typeof callback === 'function'){
                return callback({
                    info: {
                        product: ["has no discount"],
                    },
                    product_handle: $ws.selected_product.handle,
                    product_id: $ws.selected_product.id,
                    collection_id: $ws.selected_collection.id
                }, null)
            }
        }
        $ws.product_rd_obj = [];
        $ws.product_regular_discount = {};
        // for loop
        for (var j = 0, len_j = $ws.productRd.length; j < len_j; j++) {
            var rd_rule = $ws.productRd[j];
            if("products" === rd_rule.applies_to && rd_rule.individual_product === true){
                rd_rule.products.forEach(function(product,pIndex){
                    if(product.handle === $ws.selected_product.handle || product.id == $ws.selected_product.id){
                        if($ws.product_regular_discount.handle !== product.handle){
                            $ws.product_regular_discount = JSON.parse(JSON.stringify(rd_rule));
                            $ws.product_regular_discount["product"] = product;
                        }
                        if(product.variant_level){
                            product.variants.forEach(function(variant,vIndex){
                                var vIn = variant.tag_options.findIndex(function(apt){ return apt.name.toString().toLowerCase() == $ws.applied_tag.toString().toLowerCase()});
                                if(vIn > -1 && (variant.id == $ws.selected_variant.id || variant.sku == $ws.selected_variant.sku)){
                                    var v_tag_option = variant.tag_options[vIn];
                                    $ws.product_rd_obj.push({
                                        name: v_tag_option.name,
                                        value: v_tag_option.value,
                                        type: v_tag_option.type
                                    });
                                }
                            });
                        }
                        else{
                            var pIn = product.tag_options.findIndex(function(apt){ return apt.name.toString().toLowerCase() == $ws.applied_tag.toString().toLowerCase()});
                            if(pIn>-1) {
                                var tag_option = product.tag_options[pIn];
                                $ws.product_rd_obj.push({
                                    name: tag_option.name,
                                    value: tag_option.value,
                                    type: tag_option.type
                                });
                            }
                        }
                    }
                });
            }
            else{
                product_rd_obj = {
                    name: rd_rule.applies_to,
                    type: rd_rule.discount_type,
                    value: rd_rule.discount_value
                }
                $ws.product_regular_discount = JSON.parse(JSON.stringify(rd_rule));
                if(rd_rule.applies_to === "collections"){
                    $ws.product_regular_discount["collections"] = $ws.product_regular_discount.collections.filter(function(c){ return c.id == $ws.selected_collection.id });
                }
            }
        }
        $ws.product_regular_discount["volume_discount"] = JSON.parse(JSON.stringify($ws.product_rd_obj));
        // if TRUE, app will alter prices. our app will output price and compare at price
        if($ws.output){
            var price = Number($ws.mF($ws.selected_variant.price));
            if($ws.product_regular_discount["volume_discount"].length > 0){
                $ws.product_regular_discount.discount_type = $ws.product_regular_discount["volume_discount"][0].type;
                $ws.product_regular_discount.discount_value = $ws.product_regular_discount["volume_discount"][0].value;
            }
            if(typeof $ws.product_regular_discount.discount_type === 'undefined'){return;}
            if(typeof $ws.product_regular_discount.discount_value === 'undefined'){return;}
            var discount = $ws.get_discount(price, $ws.product_regular_discount.discount_type, $ws.product_regular_discount.discount_value);
            if(Number(discount) == 0 || (Number(price) == 0)){ return null; }
            var regular_price = (Number(price) - Number(discount)).toFixed(2);
            var compare_at_price = $ws.selected_variant.price;
            if($ws.general_settings.show_compare_at_price){
                compare_at_price = $ws.selected_variant.compare_at_price;
            }
            if(isNaN($ws.selected_variant.compare_at_price) || (Number($ws.selected_variant.compare_at_price)<=Number($ws.selected_variant.price) ) ){
                compare_at_price = 0;
                if((Number(price)-Number(discount)) < Number(price)){
            		compare_at_price = Number(price).toFixed(2);
                }
            }
            var html = $ws.hcsr_price_html;
            var saved_price_html = $ws.saved_price_in_grid_html;
            if($ws.template === 'product'){
                html = $ws.product_price_html, saved_price_html = $ws.saved_price_html;
            }
            var total_saved = $ws.saved_amount(compare_at_price, regular_price);
            if($ws.saved_price_html.indexOf(":percentage") > -1){
                if(total_saved.percentage){
                    saved_price_html = saved_price_html
                    .replace(new RegExp(":percentage","gi"), "")
                    .replace(new RegExp(":price","gi"), "")
                    .replace(new RegExp("%saved_amount%","gi"), total_saved.percentage);
                    $ws.alterHTML(saved_price_html, $ws.product_saved_amount_selector.replace("%id%",$ws.selected_product.id));
                }
            }
            else{
                if(total_saved.price){
                    saved_price_html = saved_price_html
                    .replace(new RegExp(":percentage","gi"), "")
                    .replace(new RegExp(":price","gi"), "")
                    .replace(new RegExp("%saved_amount%","gi"), $ws.formatMoney(total_saved.price));
                    $ws.alterHTML(saved_price_html, $ws.product_saved_amount_selector.replace("%id%",$ws.selected_product.id));
                }
            }
            regular_price = $ws.formatMoney((Number(price)-Number(discount)).toFixed(2));
            compare_at_price = $ws.formatMoney(compare_at_price);
            if(Number(compare_at_price) < 1){
                compare_at_price = "";
            }
            if(!$ws.general_settings.compare_at_price){
                compare_at_price = "";
            }
            html = html.replace(new RegExp("%regular_price%","gi"), regular_price)
            .replace(new RegExp("%compare_at_price%","gi"), compare_at_price);
            if($ws.landingTemplate !== "product" && $ws.landingTemplate !== "cart"){
                html = $ws.hcsr_price_html
                .replace(new RegExp("%regular_price%","gi"), regular_price)
                .replace(new RegExp("%compare_at_price%","gi"), compare_at_price);
            }
            $ws.alterHTML(html, $ws.product_id_selector.replace("%id%",$ws.selected_product.id));
        }
        // response back
        if(typeof callback === 'function'){
            return callback(null, {
                product_regular_discount: $ws.product_regular_discount, 
                regular_discount: $ws.product_rd_obj,
                product: $ws.selected_product,
                variant: $ws.selected_variant
            });
        }
        // end for loop
    };//end regularDiscount

    WSAIO.get_discount = function(price,type,value){
        var d = 0;
        switch (type) {
            case "percentage":
                d = (Number(price) * Number(value)) / 100;
                break;
            case "price_discount":
                if(Number(price) < Number(value)){
                    d = Number(price);
                }
                else{
                    d = Number(value);
                }
                break;
            case "fixed_price":
                if(Number(price) <= Number(value)){
                    d = 0;
                }
                else{
                    d = Number(price) - Number(value);
                }
                break;
            default:
                log("Invalid discount type. Valid values are percentage, price_discount and fixed_price.");
                break;
        }
        return Number(d).toFixed(2);
    }

    WSAIO.get_price = function(rule, vd){
        if($ws.selected_variant.price){
            var price = $ws.mF($ws.selected_variant.price);
            var discount = $ws.get_discount(price, vd.type, vd.value);
            var wholesale_price = Number(price) - Number(discount);
            try{
                wholesale_price = Number(wholesale_price).toFixed(2);
            }catch(e){isError(e)}
            return $ws.formatMoney(wholesale_price, $ws.shopInfo.money_format);
        }
        else{
            isError("Selected variant price was not defined. Reference: WSAIO.selected_variant.price")
        }
    };

    WSAIO.get_price_in_percent = function(rule, vd){
        if($ws.selected_variant.price){
            var price = $ws.mF($ws.selected_variant.price);
            var discount = $ws.get_discount(price, vd.type, vd.value);
            var perc = 100 - ((Number(price) - Number(discount)) / Number(price))*100;
            return perc.toString()+'%';
        }
        else{
            isError("Selected variant price was not defined. Reference: WSAIO.selected_variant.price")
        }
    };

    WSAIO.saved_amount = function(original_price, discount_price) {
        if (original_price === null || discount_price === null || isNaN(original_price) || isNaN(discount_price)){
            return {
                percentage: "0%",
                price: "0"
            };
        };
        var price = original_price-discount_price, percentage = 100-(discount_price/original_price)*100;
        return {
            percentage: Math.round(percentage)+"%",
            price: Number(price).toFixed(2)
        };
    };

    // Product page Tables grid
    WSAIO.detailed_grid_table = function(rule, params){
        if('undefined' !== typeof rule.volume_discount && rule.volume_discount.length > 0){
            var table_rows = "";
            rule.volume_discount.forEach( function(vd,i){
                table_rows += '<tr class="wholesale-grid-table custom-table">'
                +'<td>'+vd.qty+'</td>'
                +'<td>'+$ws.get_price(rule,vd)+$ws.translation.each_item+'</td>'
                +'</tr>';
            });
            var table = '<table id="wsaio-volume-discount--table" class="wholesale-table">'
            +'<thead><tr>'
            +'<th>'+$ws.translation.buy+' '+$ws.translation.quantity+'</th>'
            +'<th>'+$ws.translation.price+'</th>'
            +'</tr></thead>'
            +'<tbody>'+table_rows+'</tbody>'
            +'</table>';
            
            // Remove the table, also check for the quick view
            if(!$ws.remove_duplicate_table){
                $("#wsaio-volume-discount--table").remove();
            }
            $ws.displayTable(table,$ws.product_qb_table_selector, true);
        }
        else{
            isError("Volume discount was not configured.");
        }
    };

    WSAIO.basic_grid_table = function(rule, params){
        if('undefined' !== typeof rule.volume_discount && rule.volume_discount.length > 0){
            var table_rows = "";
            rule.volume_discount.forEach( function(vd,i){
                table_rows += '<tr class="wholesale-grid-table custom-table">'
                +'<td>'+vd.qty+'</td>'
                +'<td>'+$ws.get_price(rule,vd)+$ws.translation.each_item+'</td>'
                +'</tr>';
            });
            var table = '<table id="wsaio-volume-discount--table" class="wholesale-table">'
            +'<thead><tr>'
            +'<th>'+$ws.translation.quantity+'</th>'
            +'<th>'+$ws.translation.price+'</th>'
            +'</tr></thead>'
            +'<tbody>'+table_rows+'</tbody>'
            +'</table>';
            // Remove the table, also check for the quick view
            if(!$ws.remove_duplicate_table){
                $("#wsaio-volume-discount--table").remove();
            }
            $ws.displayTable(table,$ws.product_qb_table_selector, true);
        }
        else{
            isError("Volume discount was not configured.");
        }
    };

    WSAIO.grid_range_table = function(rule, params){
        if('undefined' !== typeof rule.volume_discount && rule.volume_discount.length > 0){
            var table_rows = "";
            rule.volume_discount.forEach( function(vd,i){
                var next_qty = $ws.translation.range_so_on;
                if(rule.volume_discount[i+1]){
                    next_qty = Number(rule.volume_discount[i+1].qty) - 1;
                }
                table_rows += '<tr class="wholesale-grid-table custom-table">'
                +'<td>'+vd.qty+'</td>'
                +'<td>'+next_qty+'</td>'
                +'<td>'+$ws.get_price(rule,vd)+$ws.translation.each_item+'</td>'
                +'</tr>';
            });
            var table = '<table id="wsaio-volume-discount--table" class="wholesale-table">'
            +'<thead><tr>'
            +'<th>'+$ws.translation.minimum_quantity+'</th>'
            +'<th>'+$ws.translation.maximum_quantity+'</th>'
            +'<th>'+$ws.translation.price+'</th>'
            +'</tr></thead>'
            +'<tbody>'+table_rows+'</tbody>'
            +'</table>';
            // Remove the table, also check for the quick view
            if(!$ws.remove_duplicate_table){
                $("#wsaio-volume-discount--table").remove();
            }
            $ws.displayTable(table,$ws.product_qb_table_selector, true);
        }
        else{
            isError("Volume discount was not configured.");
        }
    };

    WSAIO.detailed_grid_percent_table = function(rule, params){
        if('undefined' !== typeof rule.volume_discount && rule.volume_discount.length > 0){
            var table_rows = "";
            rule.volume_discount.forEach( function(vd,i){
                table_rows += '<tr class="wholesale-grid-table custom-table">'
                +'<td>'+vd.qty+'</td>'
                +'<td>'+$ws.get_price(rule,vd)+$ws.translation.each_item+'</td>'
                +'<td>'+$ws.get_price_in_percent(rule,vd)+' '+$ws.translation.off+'</td>'
                +'</tr>';
            });
            var table = '<table id="wsaio-volume-discount--table" class="wholesale-table">'
            +'<thead><tr>'
            +'<th>'+$ws.translation.quantity+'</th>'
            +'<th>'+$ws.translation.price+'</th>'
            +'<th>'+$ws.translation.discount+'</th>'
            +'</tr></thead>'
            +'<tbody>'+table_rows+'</tbody>'
            +'</table>';
            // Remove the table, also check for the quick view
            if(!$ws.remove_duplicate_table){
                $("#wsaio-volume-discount--table").remove();
            }
            $ws.displayTable(table,$ws.product_qb_table_selector, true);
        }
        else{
            isError("Volume discount was not configured.");
        }
    };

    WSAIO.percent_grid_table = function(rule, params){
        if('undefined' !== typeof rule.volume_discount && rule.volume_discount.length > 0){
            var table_rows = "";
            rule.volume_discount.forEach( function(vd,i){
                table_rows += '<tr class="wholesale-grid-table custom-table">'
                +'<td>'+$ws.translation.buy+' '+vd.qty+'</td>'
                +'<td>'+$ws.get_price_in_percent(rule,vd)+' '+$ws.translation.off+'</td>'
                +'</tr>';
            });
            var table = '<table id="wsaio-volume-discount--table" class="wholesale-table">'
            +'<thead><tr>'
            +'<th>'+$ws.translation.quantity+'</th>'
            +'<th>'+$ws.translation.discount+'</th>'
            +'</tr></thead>'
            +'<tbody>'+table_rows+'</tbody>'
            +'</table>';
            // Remove the table, also check for the quick view
            if(!$ws.remove_duplicate_table){
                $("#wsaio-volume-discount--table").remove();
            }
            $ws.displayTable(table,$ws.product_qb_table_selector, true);
        }
        else{
            isError("Volume discount was not configured.");
        }
    };
    
    WSAIO.grid_range_alternate_table = function(rule, params){
        if('undefined' !== typeof rule.volume_discount && rule.volume_discount.length > 0){
            var table_rows = "";
            rule.volume_discount.forEach( function(vd,i){
                var next_qty = $ws.translation.range_so_on;
                if(rule.volume_discount[i+1]){
                    next_qty = Number(rule.volume_discount[i+1].qty) - 1;
                }
                table_rows += '<tr class="wholesale-grid-table custom-table">'
                +'<td>'+vd.qty+$ws.translation.range_seperator+next_qty+'</td>'
                +'<td>'+$ws.get_price(rule,vd)+$ws.translation.each_item+'</td>'
                +'</tr>';
            });
            var table = '<table id="wsaio-volume-discount--table" class="wholesale-table">'
            +'<thead><tr>'
            +'<th>'+$ws.translation.quantity+'</th>'
            +'<th>'+$ws.translation.price+'</th>'
            +'</tr></thead>'
            +'<tbody>'+table_rows+'</tbody>'
            +'</table>';
            // Remove the table, also check for the quick view
            if(!$ws.remove_duplicate_table){
                $("#wsaio-volume-discount--table").remove();
            }
            $ws.displayTable(table,$ws.product_qb_table_selector, true);
        }
        else{
            isError("Volume discount was not configured.");
        }
    };

    WSAIO.fetchCart = function(callback){
        $.ajax({
            type: 'GET',
            url: '/cart.js',
            cache: false,
            dataType: 'json',
            success: function(a){
                var ws_cart_items = [];
                if(a && a.items && a.items.length > 0){
                    a.items.forEach(function(item,i){
                        try {
                            delete item.product_description;
                            delete item.featured_image;
                            delete item.url;
                            delete item.options_with_values;
                            delete item.variant_options;
                            delete item.product_description;
                        } catch (error) {
                            log(error);
                        }
                        ws_cart_items.push(item);
                    });
                    a.items = ws_cart_items;
                }
                if("function" === typeof callback){
                    callback(null,a);
                }
            },
            error: function(err){
                if("function" === typeof callback){
                    callback(err,null);
                }
            }
        });
    };

    WSAIO.checkout = function(){
        $ws.fetchCart(function(error, cart){
            if(error) return isError(error);
            else{
                $ws.checkoutRequest({
                    cart: cart,
                    note: "",
                    tags: "wsaio-app",
                    note_attributes: [],
                    billing_address: {},
                    shipping_address: {},
                    shopInfo: $ws.shopInfo,
                    customer: $ws.customer,
                    user_mode: $ws.user_mode,
                    currency: $ws.shopInfo.currency,
                    custom_line_items: [],
                    shopifyCurrencies: $ws.getCurrencies(),
                    discount_code_application: WSAIO.DiscountCode.application,
                    products_with_collections: $ws.products_with_collections
                }, function(error, response){
                    if (error) {
                        log(error);
                    }
                    else {
                        log(response);
                        if(typeof $ws.callback === 'function'){
                            $ws.callback(response);
                        }
                        if(response && response.checkout_url){
                            $ws.redirectToURL(response.checkout_url);
                        }
                    }
                });
            }
        });
    };

    WSAIO.preCheckout = function(){
        $ws.fetchCart(function(error, cart){
            if(error) return isError(error);
            else{
                $ws.preCheckoutRequest({
                    cart: cart,
                    shopInfo: $ws.shopInfo,
                    customer: $ws.customer,
                    user_mode: $ws.user_mode,
                    shopifyCurrencies: $ws.getCurrencies(),
                    discount_code_application: WSAIO.DiscountCode.application,
                    products_with_collections: $ws.products_with_collections
                }, function(error, response){
                    if (error) {
                        log(error);
                    }
                    else {
                        log(response);
                        if(typeof $ws.callback === 'function'){
                            $ws.callback(response);
                        }
                        if(response && response.shipping){
                            $ws.applied_shipping = response.shipping;
                            if($ws.applied_shipping.apply_shipping_charges){//check if shipping applied
                                $ws.alterHTML($ws.shipping_message_html.replace('%message%', $ws.applied_shipping.final_ship_rule.message), $ws.shipping_message_selector);
                            }
                        }
                        if(response && Number(response.wholesale_total_discount) > 0){
                            $ws.setCartSubtotal(response.original_total_price,response.checkout_price_from_original_total_price);
                            if(response.line_items){
                                $ws.setCartItemsPrice(response.line_items);
                            }
                            if(Number(response.wholesale_total_discount) > 0){
                                var total_saving = $ws.cart_bulk_saving_html
                                .replace("%saved_amount%", $ws.formatMoney(response.wholesale_total_discount));
                                $ws.alterHTML(total_saving, $ws.cart_bulk_saving_selector);
                            }
                        }
                    }
                });
            }
        });
    };

    WSAIO.redirectToURL = function(url){
        if(url){
            window.location.href = url;
        }
        else{
            isError("Redirect URL was not found!");
        }
    };

    WSAIO.checkoutRequest = function(data,callback){
        $.ajax({
            type: 'POST',
            url: $ws.App.url+'/checkout',
            cache: false,
            data: data,
            success: function(result){
                $($ws.checkout_selector).prop('disabled', false);
                if("function" === typeof callback){
                    callback(null,result);
                }
            },
            error: function(err){
                if("function" === typeof callback){
                    callback(err, null);
                }
            }
        });
    };

    WSAIO.preCheckoutRequest = function(data,callback){
        $.ajax({
            type: 'POST',
            url: $ws.App.url+'/checkout/pre',
            cache: false,
            data: data,
            success: function(result){
                if("function" === typeof callback){
                    callback(null,result);
                }
            },
            error: function(err){
                if("function" === typeof callback){
                    callback(err, null);
                }
            }
        });
    };

    WSAIO.checkoutEventListner = function(params){
      	$($ws.checkout_selector).removeAttr("disabled");
        $(document).on('click',$ws.checkout_selector,function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
            $(this).attr("disabled");
            $(this).find('[name="discount"], [name="clear_discount"]').remove();
            $(this).parents('form').find('[name="discount"], [name="clear_discount"]').remove();
            log("Wholesale All In One checkout is working.");
            $ws.checkout();
        });
    };

    WSAIO.setCartSubtotal = function(items_subtotal_price, checkout_subtotal){
        if(typeof items_subtotal_price === 'undefined' || typeof checkout_subtotal === 'undefined'){return;}
        if(Number(items_subtotal_price)<0 || Number(checkout_subtotal)<0 ){return;}
        var regular_price = $ws.formatMoney(checkout_subtotal, $ws.shopInfo.money_format);
        var compare_at_price = "";
        if(Number(items_subtotal_price) > Number(checkout_subtotal)){
            compare_at_price = $ws.formatMoney(items_subtotal_price, $ws.shopInfo.money_format);
        }
        var html = $ws.cart_subtotal_price_html
        .replace("%regular_price%",regular_price)
        .replace("%compare_at_price%",compare_at_price);
        $ws.alterHTML(html,$ws.subtotal_selector);
    };

    WSAIO.setCartItemsPrice = function(line_items){
        if(line_items && line_items.length > 0){
            line_items.forEach( function(line_item, loop_index) {
                if(typeof line_item.wholesale !== 'undefined'){
                    var wholesale = line_item.wholesale;
                    var total_html = $ws.cart_item_total_price_html
                        .replace("%regular_price%", $ws.formatMoney(wholesale.item_subtotal_price))
                        .replace("%compare_at_price%", $ws.formatMoney(wholesale.item_subtotal_compare_at_price));
                    var elem = $ws.cart_item_total_selector
                    .replace("%key%",line_item.key.replace(":","_"));
                    if(Number(wholesale.item_subtotal_price) < Number(wholesale.item_subtotal_compare_at_price)){
                        $ws.alterHTML(total_html,elem);
                    }
                    var single_price_html = $ws.cart_item_price_html
                        .replace("%regular_price%", $ws.formatMoney(wholesale.regular_price))
                        .replace("%compare_at_price%", $ws.formatMoney(wholesale.original_price));
                        var elem2 = $ws.cart_item_price_selector
                        .replace("%key%",line_item.key.replace(":","_"));
                    if(Number(wholesale.regular_price) < Number(wholesale.original_price)){
                        $ws.alterHTML(single_price_html,elem2);
                    }
                }
            });
        }
    };

    WSAIO.productDiscount = function(params){
        if(typeof params === 'undefined'){ return isError("This action required some parameters. See Docs here https://docs.google.com/document/d/1cddpARUKcOMOzl-Hrzr6Fh0RXlHJqn37mLAj2sfPiAM/edit"); }
        if(typeof params.product_id === 'undefined') { params.product_id == "default"; }
        if(typeof params.product_handle === 'undefined') { params.product_handle == "default"; }
        if(typeof params.variant_id === 'undefined') { params.variant_id == "default"; }
        if(typeof params.variant_sku === 'undefined') { params.variant_sku == "default"; }
        if(typeof params.variant_price === 'undefined') { params.variant_price == "default"; }
        if(typeof params.collection_id === 'undefined') { params.collection_id == "default"; }
        if(typeof params.qb_table_selector === 'undefined') { params.qb_table_selector == "default"; }
        if(typeof params.remove_duplicate_table === 'undefined') { params.remove_duplicate_table == "default"; }
        if(typeof params.template === 'undefined') { params.template == "default"; }
        WSAIO.volumeDiscount(params);
        WSAIO.regularDiscount(params);
    };

    WSAIO.variantChange = function(variant, selector, product){
        if(product.available){
            $ws.productDiscount({
                template: 'product',
                product_id: product.id,
                product_handle: product.handle,
                variant_id: variant.id,
                variant_sku: variant.sku,
                variant_price: variant.price,
                variant_compare_at_price: variant.compare_at_price
            });
        }
    };

    WSAIO.selectedCurrency = function(){
        return $($ws.currency_selector).val();
    }
    if('undefined' === typeof WSAIO.Currency){
        WSAIO.Currency = {};
    }
    if('undefined' === typeof WSAIO.Currency.rates){
        WSAIO.Currency.rates = {};
    }
    if('undefined' === typeof WSAIO.Currency.selectedCurrency){
        WSAIO.Currency.selectedCurrency = $ws.selectedCurrency();
    }
    WSAIO.Currency.storeCurrency = $ws.shopInfo.currency;
    if("undefined" !== typeof window.Currency){
        WSAIO.Currency.rates = window.Currency.rates;
    }
    else{
        isError("Multi currencies was not configured.")
    }

    WSAIO.getCurrencies = function(){
        if("undefined" !== typeof window.Currency){
            WSAIO.Currency.rates = window.Currency.rates;
        }
        else{
            isError("Multi currencies was not configured.")
        }
        $ws.Currency.selectedCurrency = $ws.selectedCurrency();
        $ws.Currency.storeCurrency = $ws.shopInfo.currency;
        return $ws.Currency;
    }

    WSAIO.Currency.convert = function(rates, amount, from, to){
        if(typeof rates === 'undefiend'){ rates = $ws.Currency.rates; }
        try{
            return (amount * rates[from]) / rates[to];
        }catch(e){
            return e;
        }
    }

    WSAIO.buy_it_now = function(){
        $(document).on("click", $ws.buy_now_button_selector, function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            $(this).prop("disabled", !0);
            var c = $(this).parents("form");
            var product_handle = c.find('[name="id"]').attr("data-handle"),
            variant_id = c.find('[name="id"]').val(),
            product_quantity = c.find('[name="quantity"]').val();
            void 0 === product_quantity && (product_quantity = 1);
            if(typeof $ws.buy_now_product !== 'undefined' && $ws.buy_now_product !== null){
                var product = $ws.buy_now_product;
                if(product){
                    var selected_variant_index = product.variants.findIndex(function (a) {
                        return a.id == variant_id
                    }),
                    variant = {};
                    if(- 1 <  selected_variant_index) {
                        variant = product.variants[selected_variant_index];
                    }
                    if (variant.available) {
                        var line_price = Number(variant.price) * Number(product_quantity),
                        cart = {
                            attributes: {},
                            cart_level_discount_applications: [],
                            currency: $ws.shopInfo.currency,
                            item_count: product_quantity,
                            items: [{
                                discounted_price: variant.price,
                                discounts: [],
                                featured_image: product.featured_image,
                                final_line_price: line_price,
                                final_price: variant.price,
                                gift_card: !1,
                                grams: variant.weight,
                                handle: product.handle,
                                id: variant.id,
                                image: product.featured_image,
                                key: "11309472350255:a5c7b76a76a9b8da2aa5dceab2c6b7ab",
                                line_level_discount_allocations: [],
                                line_price: line_price,
                                options_with_values: [],
                                original_line_price: line_price,
                                original_price: variant.price,
                                price: variant.price,
                                product_description: "",
                                product_has_only_default_variant: !1,
                                product_id: product.id,
                                product_title: product.title,
                                product_type: product.type,
                                properties: null,
                                quantity: product_quantity,
                                requires_shipping: variant.requires_shipping,
                                sku: variant.sku,
                                taxable: variant.taxable,
                                title: product.title + " - " + variant.title,
                                total_discount: 0,
                                url: "/products/" + product_handle + "?variant=" + variant.id,
                                variant_id: variant.id,
                                variant_options: variant.options,
                                variant_title: variant.title,
                                vendor: product.vendor
                            }],
                            items_subtotal_price: line_price,
                            note: null,
                            original_total_price: line_price,
                            requires_shipping: variant.requires_shipping,
                            token: "3cbccfbccb5ed48c66e4ced34048082d",
                            total_discount: 0,
                            total_price: line_price,
                            total_weight: Number(variant.weight) * Number(product_quantity)
                        };
                        $ws.checkoutRequest({
                            cart: cart,
                            note: "",
                            tags: "wsaio-app,checkout-via-buy-now-button",
                            note_attributes: [],
                            billing_address: {},
                            shipping_address: {},
                            shopInfo: $ws.shopInfo,
                            customer: $ws.customer,
                            user_mode: $ws.user_mode,
                            currency: $ws.shopInfo.currency,
                            custom_line_items: [],
                            shopifyCurrencies: $ws.getCurrencies(),
                            discount_code_application: WSAIO.DiscountCode.application,
                            products_with_collections: $ws.products_with_collections
                        }, function(error, response){
                            if (error) {
                                log(error);
                                $ws.redirectToURL('/cart/'+variant_id+':'+product_quantity);
                            }
                            else {
                                log(response);
                                if(typeof $ws.callback === 'function'){
                                    $ws.callback(response);
                                }
                                if(response && response.checkout_url){
                                    $ws.redirectToURL(response.checkout_url);
                                }
                                else{
                                    $ws.redirectToURL('/cart/'+variant_id+':'+product_quantity);
                                }
                            }
                        });
                    }
                    else{
                        isError("Variant is not available or missing variant");
                        $ws.redirectToURL('/cart/'+variant_id+':'+product_quantity);
                    }
                }
                else{
                    isError("Product object is missing");
                    $ws.redirectToURL('/cart/'+variant_id+':'+product_quantity);
                }
            }
            else{
                $ws.redirectToURL('/cart/'+variant_id+':'+product_quantity);
            }
        })
    };

    WSAIO.DiscountCode.subscribe = function(event_type){
        var $this = this;
        var discount_code_button = '[name='+$ws.discount_code_field_btn+']';
        var discount_code_field = '[name='+$ws.discount_code_field_name+']';
        $(discount_code_button).on(event_type||'click', function(e){
            e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();
            $this.code = $(discount_code_field).val();
            if($this.code.trim() === ""){$(discount_code_field).addClass("ws-error");$(discount_code_field).focus();}else{$(discount_code_field).removeClass("ws-error");$this.apply();}
        });
    }

    WSAIO.DiscountCode.apply = function(){
        $discount = this;
        $ws.fetchCart(function(error, cart){
            if(error){
                return isError(error);
            }
            else{
                var post_data = {
                    cart: cart,
                    shopInfo: $ws.shopInfo,
                    customer: $ws.customer,
                    coupon_code: $discount.code,
                    products_with_collections: $ws.products_with_collections
                };
                $.ajax({
                    type: "POST",
                    url: $ws.App.url+'/discount-code',
                    data: post_data,
                    dataType: "json",
                    success: function(result){
                        log(result.log);
                        try{delete result.log;}catch(e){log(e)}
                        if(typeof $ws.callback === 'function'){
                            $ws.callback(result);
                        }
                        if(result && result.status === 1){
                            if(typeof result.wholesale_key !== 'undefined'){
                                $discount.application = result;
                            }
                            var html = '<span>'+$ws.discount_code_success_message+'</span>';
                            if(result.type === 'percentage' && $ws.discount_code_success_message.indexOf('%percent%')>-1){
                                html = html.replace('%percent%',result.value+"%");
                                $ws.alterHTML(html, $ws.discount_code_alerts_selector);
                            }
                            else{
                                html = html.replace('%percent%','').replace('%price_discount%','');
                                $ws.alterHTML(html, $ws.discount_code_alerts_selector);
                            }
                        }
                        else{
                            if(result.once_per_customer && WSAIO.customer.id === null){
                                return $ws.alterHTML('<span>'+$ws.discount_code_customer_login_message+'</span>', $ws.discount_code_alerts_selector);
                            }
                            $ws.alterHTML('<span>'+$ws.discount_code_error_message+'</span>', $ws.discount_code_alerts_selector);
                        }
                    }
                });
            }
        });
    }


    if($ws.landingTemplate === "cart"){
        $ws.checkoutEventListner();// Subscribe checkout button on click event
        $ws.preCheckout(); // Get wholesale price from server on window load
    }

    if($ws.landingTemplate === "product"){
        $ws.productDiscount({
            template: 'product',
            product_id: $ws.selected_product.id,
            product_handle: $ws.selected_product.handle,
            variant_id: $ws.selected_variant.id,
            variant_sku: $ws.selected_variant.sku,
            variant_price: $ws.selected_variant.price,
            variant_compare_at_price: $ws.selected_variant.compare_at_price
        });
    }

    if($ws.landingTemplate === "collection" || $ws.landingTemplate === "search"){
        $ws.products_in_collection.forEach(function(product){
            if(product.available){
                $ws.productDiscount({
                    template: 'collection',
                    product_id: product.id,
                    product_handle: product.handle,
                    variant_id: product.first_available_variant.id,
                    variant_sku: product.first_available_variant.sku,
                    variant_price: product.first_available_variant.price,
                    variant_compare_at_price: product.first_available_variant.compare_at_price
                });
            }
        });
    }

    WSAIO.related_products = function(timeout){
        if($ws.landingTemplate === "product" || $ws.landingTemplate === "index"){
            setTimeout(function() {
                if(typeof $ws.product_recommendations === 'object'){
                    $ws.product_recommendations.forEach(function(product){
                        if(product.available && $ws.selected_product.id != product.id){
                            $ws.productDiscount({
                                template: 'collection',
                                product_id: product.id,
                                product_handle: product.handle,
                                variant_id: product.first_available_variant.id,
                                variant_sku: product.first_available_variant.sku,
                                variant_price: product.first_available_variant.price,
                                variant_compare_at_price: product.first_available_variant.compare_at_price
                            });
                        }
                    });
                }
            }, timeout||3000);
        }
    }

    $ws.related_products();

    if($ws.general_settings.discount_method === 'line_items' && true===WSAIO.general_settings.enable_additional_coupon_code && 'cart'===$ws.landingTemplate){
        $ws.DiscountCode.addForm();
        $ws.DiscountCode.subscribe("click");// subscribe on click event
    }

    $(document).on('change', $ws.cart_qty_change_selector, function() {
      $("button[name*=update],input[name*=update]").click();
      $($ws.checkout_selector).attr("disabled","disabled");
      setTimeout(function(){
        $ws.preCheckout();
      },500);
    }); 

    WSAIO.signUpForm = function(){
        if(typeof $ws.signup_form !== 'undefined'){
            try{
                0 < $($ws.signup_form_selector).length ? ($($ws.signup_form_selector).html($ws.signup_form.form_html)):log("Sign Up form selector not found");
            }catch(e){isError(e)}
        }
        else{
            log("We could not found Signup Form. Save signup form in the wholesale applicatipn dashboard and then refresh this page")
        }
    };

    $ws.signUpForm();

    WSAIO.buyNowEventListener = function(){
        $ws.buyNowRecursion(10);
    }

    WSAIO.addBuyNowBtnHTML = function(){
        $($ws.shopify_payment_button_wrapper).html($ws.buy_now_button_html);
        $ws.buy_it_now();
    }

    WSAIO.buyNowRecursion = function(limit){
        if(limit<=0)return;
        if($($ws.buy_now_button_selector).length>0){
            $ws.addBuyNowBtnHTML();
        }
        else{
            setTimeout(function(){$ws.buyNowRecursion(--limit);},2000);
        }
    }

    WSAIO.DiscountCode.add = function(){
        if(true===WSAIO.general_settings.enable_additional_coupon_code){
            $ws.DiscountCode.addForm();
            $ws.DiscountCode.subscribe("click");// subscribe on click event
        }
    };
    
    // Buy now button event listener, must be called after few seconds, so it may remove other events
    setTimeout(function(){
        $ws.buyNowEventListener();
    },1000);
    
}; //end WSAIO.init
WSAIO.removeQueryString = function(a,d){var b=document.location.href,c=location.search;""!=a?(d=encodeURIComponent(d),a=a+"="+d,"-1"!=c.indexOf("?"+a+"&")?b=b.replace("?"+a+"&","?"):"-1"!=c.indexOf("&"+a+"&")?b=b.replace("&"+a+"&","&"):"-1"!=c.indexOf("?"+a)?b=b.replace("?"+a,""):"-1"!=c.indexOf("&"+a)&&(b=b.replace("&"+a,""))):(c=location.search,b=b.replace(c,""));history.pushState({state:1,rand:Math.random()},"",b)};
WSAIO.getParameterByName = function(e){for(var b=[],c=window.location.search.substring(1).split("&"),a=0;a<c.length;a++){var d=c[a].split("=");d[0]==e&&b.push(decodeURIComponent(d[1]))}return b};
window.wsaioClosePreview = function(){WSAIO.removeQueryString("test-mode",WSAIO.getParameterByName("test-mode")[0]);localStorage.removeItem("wsaio-app-mode");WSAIO.user_mode="live";setTimeout(function(){window.location.href='https://'+WSAIO.shopInfo.domain;},300);}
window.wsaioHidePreview = function(){$(".wholesaleAllInOnePreview").hide();}
WSAIO.addPreviewBar = function(){var previewBar = '<div class="wholesaleAllInOnePreview" style="background-color: white;display: inline-block;width: 100%;padding: 13px 0px;box-shadow: rgba(0, 0, 0, 0.2) 0px -1px 3px;overflow: hidden;position: fixed;bottom: 0;left: 0;right: 0;z-index: 3147483648;opacity: 0.97;"><div style="float:left;display:inline-block;padding-left:20px"><p style="margin: 0px;color:black"><span><b>Wholesale All In One Preview: </b></span> Wholesale pricing are only visible to you. <a href="https://support.digitalcoo.com/hc/en-us/articles/360042800512"><u>Learn More</u></a></p></div><div style="float:right;display:inline-block;padding-right: 23px;"><button class="ws--preview-bar-btn" onclick="wsaioClosePreview();">Close Preview</button><button style="border:none;margin-left:.3rem;background:0 0;box-shadow:none;color:#007ace;font-size:14px;opacity:1" onclick="wsaioHidePreview();">Hide bar</button></div></div>';0==$(".wholesaleAllInOnePreview").length&&$("body").append(previewBar);}
var waioLoadScript=function(c,b){var a=document.createElement("script");a.type="text/javascript";a.readyState?a.onreadystatechange=function(){if("loaded"==a.readyState||"complete"==a.readyState)a.onreadystatechange=null,b()}:a.onload=function(){b()};a.src=c;document.getElementsByTagName("head")[0].appendChild(a)};
if("undefined" !== typeof WSAIO.getParameterByName("test-mode")[0]){WSAIO.user_mode="test";localStorage.setItem("wsaio-app-mode", "test");WSAIO.addPreviewBar();}
if(localStorage.getItem("wsaio-app-mode") !== null){ WSAIO.addPreviewBar(); }
if(WSAIO.app_mode === 'live' && WSAIO.disable_logs_when_live === true){WSAIO.log='';WSAIO.errorLog='';}
if(WSAIO.app_mode === "live" || (WSAIO.app_mode === WSAIO.user_mode)){"undefined"===typeof jQuery||1.7>parseFloat(jQuery.fn.jquery)?waioLoadScript("//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",function(){WSAIO.init(jQuery.noConflict(!0))}):WSAIO.init(jQuery);}else{console.warn("WSAIO LOG!", "Application is disabled");WSAIO = undefined;}