#!/bin/bash
set -e

echo "Hello from wait script!"

sleep 15

if ! kubectl auth can-i --list --namespace "${K8S_NAMESPACE}" >/dev/null 2>&1; then
  echo "Could not reach the kube api."
  exit 1
fi
