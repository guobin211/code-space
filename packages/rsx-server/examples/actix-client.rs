use std::error::Error as StdError;

// 使用actix-web的awc客户端
#[actix_rt::main]
async fn main() -> Result<(), Box<dyn StdError>> {
    // construct request builder
    let client = awc::Client::new();

    // configure request
    let request = client.get("https://www.baidu.com");

    println!("Request: {:?}", request);

    let mut response = request.send().await?;

    // server response head
    println!("Response: {:?}", response);

    // read response body
    let body = response.body().await?;
    println!("Downloaded: {:?} bytes", body.len());

    Ok(())
}
