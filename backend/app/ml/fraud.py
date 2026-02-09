from collections import defaultdict
from statistics import mean, pstdev

from app.schemas.common import FraudInput, FraudOut, TransactionIn


def detect_fraud(payload: FraudInput) -> FraudOut:
    txs = payload.transactions
    if not txs:
        return FraudOut(
            suspicious_transactions=[],
            possible_loss_estimate=0.0,
            risk_severity="Low",
        )

    amounts = [t.amount for t in txs]
    avg = mean(amounts)
    std = pstdev(amounts) or 1.0

    suspicious: list[TransactionIn] = []
    duplicate_map: defaultdict[tuple, list[TransactionIn]] = defaultdict(list)
    for tx in txs:
        duplicate_map[(tx.vendor, tx.amount, tx.date)].append(tx)
        z_score = (tx.amount - avg) / std
        if abs(z_score) >= 3:
            suspicious.append(tx)

    for dup_group in duplicate_map.values():
        if len(dup_group) > 1:
            suspicious.extend(dup_group)

    possible_loss = sum(tx.amount for tx in suspicious)
    if possible_loss > avg * 10:
        severity = "High"
    elif possible_loss > avg * 5:
        severity = "Medium"
    else:
        severity = "Low"

    return FraudOut(
        suspicious_transactions=suspicious,
        possible_loss_estimate=round(possible_loss, 2),
        risk_severity=severity,
    )
