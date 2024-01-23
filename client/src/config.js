// config.js
const config = {
    // Server address and port
    ServerUserName: "testUser",
    ServerPassword: "password1",
    ServerIPAddress: "192.168.1.85",
    ServerPort: 8800,
    DataEndpointAddress: `http://${ServerIPAddress}:${ServerPort}/`,
    
    // Page Data Endpoint Suffixes
    WeatherConditionsEndpointSuffix: "WeatherConditions", 
    OWMConditionsEndpointSuffix: "OWMConditions", 
    PiStarConditionsEndpointSuffix: "PiStarConditions", 
    HamConditionsEndpointSuffix: "HamConditions", 
    GasPricesEndpointSuffix: "GasPriceData", 
    BidenDataEndpointSuffix: "BidenData",     

    // Chart Data Endpoint Suffixes
    HamConditionsChartDataEndpointSuffix: "HamConditionsChartData", 
    OWMChartDataEndpointSuffix: "OWMChartData", 
    BidenChartDataEndpointSuffix: "BidenChartData", 
    GasPriceChartDataEndpointSuffix: "GasPriceChartData", 

    // Page Titles
    WeatherConditionsPageTitle: "Weather Conditions", 
    OWMConditionsPageTitle: "OWM Weather Conditions", 
    PiStarConditionsPageTitle: "PiStar Conditions", 
    HamConditionsPageTitle: "Ham Band Conditions", 
    GasPricesPageTitle: "Colorado Avg Daily Fuel Prices", 
    BidenDataPageTitle: "Joe Biden's Approval Rating", 
    
    // Chart Titles
    HamSolarFluxChartTitle: "Solar Flux Chart", 
    HamSolarWindChartTitle: "Solar Wind Chart", 
    HamSunspotNumberChartTitle: "Sunspot Number Chart", 
    OWMCloudinessChartTitle: "24 Hour Cloudiness Report", 
    OWMHumidityChartTitle: "24 Hour Humidity Report", 
    OWMTempChartTitle: "24 Hour Temperature Report", 
    OWMWindSpeedChartTitle: "24 Hour Wind Speed Report", 
    BidenApprovalChartTitle: "Joe Biden's Approval Rating", 
    GasPriceChartTitle: "Colorado Avg Daily Fuel Prices", 

    // Interval for data refresh (minutes)
    FetchInterval: 1 * 60 * 1000,

    // Emojis
    GoodEmoji: '😍', 
    FairEmoji: '😐', 
    PoorEmoji: '💩', 

  };
  
  export default config;
  