#!/usr/bin/env python3
"""
CareBridge AI - Server
Serves the web application and provides API endpoints for the multi-agent system.
"""
import http.server
import socketserver
import os
import sys
import json
import urllib.parse

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CareBridgeHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/agent/query':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                query = data.get('query', '')
                member_id = data.get('member_id', 'san_01')
                
                # Simulating backend agent orchestrator response
                response_payload = {
                    "status": "success",
                    "coordinator": "Health Coordinator Agent",
                    "activated_agents": ["Health Assessment Agent", "Safety Agent", "Health Summary Agent"],
                    "message": "Processed query through multi-agent pipeline.",
                    "query": query,
                    "member_id": member_id
                }
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response_payload).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    port = PORT
    for attempt_port in [8080, 8000, 3000, 5000, 8081]:
        try:
            with socketserver.TCPServer(("", attempt_port), CareBridgeHandler) as httpd:
                print(f"==================================================")
                print(f" CareBridge AI Server Running at http://localhost:{attempt_port}")
                print(f" Hackathon Demo & Multi-Agent Platform Ready")
                print(f"==================================================")
                sys.stdout.flush()
                httpd.serve_forever()
                break
        except OSError:
            continue

if __name__ == "__main__":
    run_server()
