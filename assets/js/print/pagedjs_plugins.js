var TocHeaders = [ 'h1', 'h2'];

function createToc(config){
    const content = config.content;
    const tocElement = config.tocElement;
    const titleElements = config.titleElements;
    
    let tocElementDiv = content.querySelector(tocElement);
    let tocUl = document.createElement("ul");

    if (tocElementDiv === null) {
        return;
    }
    tocUl.id = "list-toc-generated";
    tocElementDiv.appendChild(tocUl); 

    // add class to all title elements
    let tocElementNbr = 0;
    for(var i= 0; i < titleElements.length; i++){
        
        let titleHierarchy = i + 1;
        let titleElement = content.querySelectorAll(titleElements[i]);  


        titleElement.forEach(function(element) {

            // add classes to the element
            element.classList.add("title-element");
            element.setAttribute("data-title-level", titleHierarchy);

            // add id if doesn't exist
            tocElementNbr++;
            idElement = element.id;
            if(idElement == ''){
                element.id = 'title-element-' + tocElementNbr;
            } 
            let newIdElement = element.id;

        });

    }

    // create toc list
    let tocElements = content.querySelectorAll(".ci-page .title-element");  

    for(var i= 0; i < tocElements.length; i++){
        let tocElement = tocElements[i];

        let tocNewLi = document.createElement("li");

        // Add class for the hierarcy of toc
        tocNewLi.classList.add("toc-element");
        tocNewLi.classList.add("toc-element-level-" + tocElement.dataset.titleLevel);

        // Keep class of title elements
        let classTocElement = tocElement.classList;
        for(var n= 0; n < classTocElement.length; n++){
            if(classTocElement[n] != "title-element"){
                tocNewLi.classList.add(classTocElement[n]);
            }   
        }

        // Create the element
        tocNewLi.innerHTML = '<a href="#' + tocElement.id + '">' + tocElement.innerHTML + '</a>';
        tocUl.appendChild(tocNewLi);  
    }

}


class Toc extends Paged.Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
    }

    beforeParsed(content){          
        createToc({
            content: content,
            tocElement: '#toc',
            titleElements: TocHeaders
        });
    }

    afterPageLayout(pageFragment, page) {
        //console.log(pageFragment);
    }

}

class RepeatingTableHeaders extends Paged.Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
    }

    afterPageLayout(pageElement, page, breakToken, chunker) {
        // Find all split table elements
        let tables = pageElement.querySelectorAll("table[data-split-from]");

        tables.forEach((table) => {
            // There is an edge case where the previous page table 
            // has zero height (isn't visible).
            // To avoid double header we will only add header if there is none.
            let tableHeader = table.querySelector("thead");
            if (tableHeader) {
                return;
            }

            // Get the reference UUID of the node
            let ref = table.dataset.ref;
            // Find the node in the original source
            let sourceTable = chunker.source.querySelector("[data-ref='" + ref + "']");

            // Find if there is a header
            let sourceHeader = sourceTable.querySelector("thead");
            if (sourceHeader) {
                console.log("Table header was cloned, because it is splitted.");
                // Clone the header element
                let clonedHeader = sourceHeader.cloneNode(true);
                // Insert the header at the start of the split table
                table.insertBefore(clonedHeader, table.firstChild);
            }
        });

        // Find all tables
        tables = pageElement.querySelectorAll("table");

        // special case which might not fit for everyone
        tables.forEach((table) => {
            // if the table has no rows in body, hide it.
            // This happens because my render engine creates empty tables.
            let sourceBody = table.querySelector("tbody > tr");
            if (!sourceBody) {
                console.log("Table was hidden, because it has no rows in tbody.");
                table.style.visibility = "hidden";
                table.style.position = "absolute";

                var lineSpacer = table.nextSibling;
                if (lineSpacer) {
                    lineSpacer.style.visibility = "hidden";
                    lineSpacer.style.position = "absolute";
                }
            }
        });
    }
}


