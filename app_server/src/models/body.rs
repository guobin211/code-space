pub trait BodyParser {
  fn from_json(&self) -> Result<serde_json::Value, serde_json::Error>;
  fn from_form_data(&self) -> Result<serde_json::Value, serde_json::Error>;
  fn from_buffer(&self) -> Result<serde_json::Value, serde_json::Error>;
}
