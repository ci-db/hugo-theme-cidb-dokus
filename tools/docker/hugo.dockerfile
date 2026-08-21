FROM ghcr.io/gohugoio/hugo:v0.165.0
WORKDIR /cidb/lib
RUN cd /cidb/lib
RUN wget https://github.com/Pagefind/pagefind/releases/download/v1.5.2/pagefind-v1.5.2-x86_64-unknown-linux-musl.tar.gz
RUN tar -xf pagefind-v1.5.2-x86_64-unknown-linux-musl.tar.gz  