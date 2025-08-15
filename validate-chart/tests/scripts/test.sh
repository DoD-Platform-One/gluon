#!/bin/bash
set -e

echo "Hello from Test Script"

sleep 15

if ! curl https://www.google.com >/dev/null 2>&1; then
  echo "Could not curl out to the web."
  exit 1
fi

if ! kubectl auth can-i --list --namespace "${K8S_NAMESPACE}" 2>&1; then
  echo "Could not reach the kube api."
  exit 1
fi
