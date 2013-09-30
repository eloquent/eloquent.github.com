jQuery(document).ready(
    function() {
        jQuery("[data-toggle='tooltip']").tooltip(
            {
                "placement": "bottom",
                "container": "body"
            }
        );
        jQuery('pre code').each(
            function(i, element) {
                hljs.highlightBlock(element);
            }
        );
    }
);
