# Local Prometheus + Grafana via docker-compose

This is intended to help developing metrics and dashboards for Prometheus and Grafana locally.

The script sets up a loopback address for Prometheus to poll a service running on your machine, and starts up everything.  Note that `sudo` is required to set up the loopback address, which is not a persistent configuration change. At the time of writing a hack of this kind appears to be necessary to reach the host system from within Docker containers on macOS.

So far, this has only been used and tested on macOS.

## Usage

- Execute `run.sh` to start.
- The Prometheus Web UI runs at `http://localhost:9090`.
- The Grafana Web UI runs at `http://localhost:3000`, user: `admin`/`admin`.
- By default Prometheus scrapes metrics from `http://localhost:8080/prometheus`.

## Change the Prometheus target

- Execute `docker-compose down`.
- Edit the configuration in `prom-conf/prometheus.yml` according to the Prometheus documentation.
- Execute `docker-compose build`.

## Acknowledgement

The configurations are based off the [Rancher Prometheus Monitoring template](https://github.com/infinityworksltd/Guide_Rancher_Monitoring).