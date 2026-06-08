import json


def parse_config(raw: str) -> dict:
    """Parse a config blob that may be JSON or simple key=value lines."""
    raw = raw.strip()
    if raw.startswith("{"):
        return json.loads(raw)
    config = {}
    for line in raw.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        key, _, value = line.partition("=")
        config[key.strip()] = value.strip()
    return config
