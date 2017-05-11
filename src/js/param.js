$(function (){

    $.lmParam = {
        defaultValue: [
            {'type':'A','subdomain':'mail','value':'112.13.12.11','status':'1'},
            {'type':'A','subdomain':'mail2','value':'112.13.12.12','status':'2'},
            {'type':'A','subdomain':'mail3','value':'112.13.12.13','status':'0'},
        ],
        recordType:[
            {'value':'A','text':'A'},
            {'value':'CNAME','text':'CNAME'}
        ],
        state:1,
        homePage:"http://www.liumapp.com",
        addDnsRecordUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/addDnsRecord.php",
        initDataUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/initRecord.php",
        uid:1,
        domainId:1
    }
});