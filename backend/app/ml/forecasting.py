from typing import List

import numpy as np


def _simple_growth_forecast(values: List[float], periods: int = 6) -> List[float]:
    if len(values) < 2:
        return values * periods
    growth = (values[-1] - values[0]) / max(len(values) - 1, 1)
    forecast = []
    base = values[-1]
    for i in range(periods):
        base += growth
        forecast.append(round(base, 2))
    return forecast


def forecast_revenue(values: List[float], periods: int = 6):
    try:
        from prophet import Prophet
        import pandas as pd

        df = pd.DataFrame(
            {
                "ds": pd.date_range("2023-01-01", periods=len(values), freq="M"),
                "y": values,
            }
        )
        model = Prophet()
        model.fit(df)
        future = model.make_future_dataframe(periods=periods, freq="M")
        forecast = model.predict(future)
        output = forecast["yhat"].tail(periods).round(2).tolist()
        return {"forecast": output, "method": "prophet"}
    except Exception:
        try:
            from statsmodels.tsa.arima.model import ARIMA

            model = ARIMA(np.array(values), order=(1, 1, 1))
            model_fit = model.fit()
            forecast = model_fit.forecast(steps=periods).round(2).tolist()
            return {"forecast": forecast, "method": "arima"}
        except Exception:
            return {"forecast": _simple_growth_forecast(values, periods), "method": "linear"}
