use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct ApiResponse<T> {
    /// 接口业务状态码
    code: u16,
    /// 接口业务数据
    data: Option<T>,
    /// 接口业务提示
    msg: String,
    /// Http请求唯一标记
    mark: Option<String>,
}
