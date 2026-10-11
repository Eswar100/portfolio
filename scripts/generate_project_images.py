import os
from PIL import Image, ImageDraw, ImageFont

def create_task_manager_screenshot():
    w, h = 960, 560
    im = Image.new('RGB', (w, h), color='#1e222b')
    draw = ImageDraw.Draw(im)
    
    # Header bar
    draw.rectangle([0, 0, w, 52], fill='#161920')
    draw.line([0, 52, w, 52], fill='#2e3442', width=1)
    
    # Window controls (macOS style dots)
    draw.ellipse([18, 20, 28, 30], fill='#ef4444')
    draw.ellipse([34, 20, 44, 30], fill='#eab308')
    draw.ellipse([50, 20, 60, 30], fill='#22c55e')
    
    # App title
    # Sidebar
    draw.rectangle([0, 53, 210, h], fill='#181b22')
    draw.line([210, 53, 210, h], fill='#2a2f3d', width=1)
    
    # Sidebar items
    nav_items = [("Dashboard", True), ("Task Queue", False), ("Spring Batch", False), ("HikariCP Pool", False), ("REST Endpoints", False), ("System Logs", False)]
    for i, (name, active) in enumerate(nav_items):
        y = 80 + i * 40
        if active:
            draw.rectangle([14, y, 196, y + 32], fill='#2b4c7e')
        else:
            draw.rectangle([14, y, 196, y + 32], outline='#252a36', width=1)
            
    # Metrics Cards
    cards = [
        ("ACTIVE TASKS", "1,428", "+12.4% / sec", "#38bdf8"),
        ("REST LATENCY", "8.4 ms", "p99 < 14ms", "#4ade80"),
        ("THREAD WORKERS", "32 / 32", "Hikari Active", "#fbbf24"),
        ("DB INTEGRITY", "100%", "ACID Locked", "#a855f7")
    ]
    card_w = 168
    for i, (label, val, sub, col) in enumerate(cards):
        x = 230 + i * (card_w + 14)
        y = 75
        draw.rectangle([x, y, x + card_w, y + 84], fill='#232834', outline='#313848', width=1)
        draw.line([x, y, x + card_w, y], fill=col, width=2)
        
    # Table / Tasks List Area
    draw.rectangle([230, 180, w - 24, h - 24], fill='#1a1d26', outline='#2d3444', width=1)
    # Table header
    draw.rectangle([230, 180, w - 24, 218], fill='#232834')
    draw.line([230, 218, w - 24, 218], fill='#313848', width=1)
    
    # Rows
    rows = [
        ("TASK-8902", "INVOICE_LEDGER_SYNC", "Spring Boot Worker #4", "COMPLETED", "3ms"),
        ("TASK-8903", "USER_AUTH_TOKEN_ROTATION", "OAuth2 Session Manager", "ACTIVE", "11ms"),
        ("TASK-8904", "ELASTIC_SEARCH_INDEXING", "Batch Ingestion Service", "ACTIVE", "42ms"),
        ("TASK-8905", "TRANSACTION_ROLLBACK_AUDIT", "Hibernate Transaction Mgr", "COMPLETED", "6ms"),
        ("TASK-8906", "PAYLOAD_VALIDATION_SCHEMA", "Spring MVC Dispatcher", "COMPLETED", "2ms"),
        ("TASK-8907", "KAFKA_TOPIC_REBALANCING", "Consumer Partition #2", "QUEUED", "0ms"),
        ("TASK-8908", "MYSQL_SLOW_QUERY_MONITOR", "Percona Toolkit Scanner", "ACTIVE", "18ms")
    ]
    
    for idx, row in enumerate(rows):
        ry = 228 + idx * 42
        if idx % 2 == 1:
            draw.rectangle([232, ry - 6, w - 26, ry + 32], fill='#20242f')
        draw.line([230, ry + 34, w - 24, ry + 34], fill='#282e3c', width=1)
        # Status pill
        status_col = '#22c55e' if row[3] == 'COMPLETED' else ('#38bdf8' if row[3] == 'ACTIVE' else '#94a3b8')
        draw.rectangle([w - 180, ry + 2, w - 80, ry + 24], fill=status_col)
    
    im.save('public/assets/projects/task-manager.png', quality=95)
    print("task-manager.png generated")

def create_banking_screenshot():
    w, h = 960, 560
    im = Image.new('RGB', (w, h), color='#19231f')
    draw = ImageDraw.Draw(im)
    
    # Top header bar
    draw.rectangle([0, 0, w, 52], fill='#121915')
    draw.line([0, 52, w, 52], fill='#23332a', width=1)
    
    # Window dots
    draw.ellipse([18, 20, 28, 30], fill='#ef4444')
    draw.ellipse([34, 20, 44, 30], fill='#eab308')
    draw.ellipse([50, 20, 60, 30], fill='#22c55e')
    
    # Sidebar
    draw.rectangle([0, 53, 210, h], fill='#141c18')
    draw.line([210, 53, 210, h], fill='#23332a', width=1)
    
    nav_items = [("Core Ledger", True), ("Double Entry", False), ("ACID Transactions", False), ("Account Registry", False), ("Audit Logs", False)]
    for i, (name, active) in enumerate(nav_items):
        y = 80 + i * 42
        if active:
            draw.rectangle([14, y, 196, y + 32], fill='#2d5a3f')
        else:
            draw.rectangle([14, y, 196, y + 32], outline='#23332a', width=1)
            
    # Metrics
    cards = [
        ("TOTAL SETTLED", "$4,892,150.00", "24h Volume", "#4ade80"),
        ("CONCURRENCY", "ISOLATION LEVEL", "SERIALIZABLE", "#38bdf8"),
        ("MUTEX LOCKS", "0 DEADLOCKS", "Thread-Safe", "#fbbf24"),
        ("INTEGRITY", "HASH VERIFIED", "SHA-256 Chain", "#34d399")
    ]
    card_w = 168
    for i, (label, val, sub, col) in enumerate(cards):
        x = 230 + i * (card_w + 14)
        y = 75
        draw.rectangle([x, y, x + card_w, y + 84], fill='#1c2a23', outline='#2d4237', width=1)
        draw.line([x, y, x + card_w, y], fill=col, width=2)
        
    # Transaction Ledger terminal table
    draw.rectangle([230, 180, w - 24, h - 24], fill='#141d18', outline='#283a30', width=1)
    draw.rectangle([230, 180, w - 24, 218], fill='#1d2b23')
    draw.line([230, 218, w - 24, 218], fill='#283a30', width=1)
    
    rows = [
        ("TX-99014", "ACCT_88192 -> ACCT_11029", "+$15,000.00", "SETTLED", "BLOCK #19208"),
        ("TX-99015", "ACCT_33912 -> ACCT_77410", "+$2,450.50", "SETTLED", "BLOCK #19209"),
        ("TX-99016", "ACCT_00291 -> ACCT_99182", "+$890.00", "SETTLED", "BLOCK #19210"),
        ("TX-99017", "ACCT_44102 -> ACCT_55219", "+$120,000.00", "PENDING_LOCK", "BLOCK #19211"),
        ("TX-99018", "ACCT_11904 -> ACCT_33890", "+$6,720.00", "SETTLED", "BLOCK #19212"),
        ("TX-99019", "ACCT_66201 -> ACCT_22091", "+$450.00", "SETTLED", "BLOCK #19213"),
        ("TX-99020", "ACCT_88319 -> ACCT_44018", "+$3,190.25", "SETTLED", "BLOCK #19214")
    ]
    for idx, row in enumerate(rows):
        ry = 228 + idx * 42
        if idx % 2 == 1:
            draw.rectangle([232, ry - 6, w - 26, ry + 32], fill='#18231e')
        draw.line([230, ry + 34, w - 24, ry + 34], fill='#23332a', width=1)
        status_col = '#22c55e' if row[3] == 'SETTLED' else '#eab308'
        draw.rectangle([w - 230, ry + 2, w - 120, ry + 24], fill=status_col)
        
    im.save('public/assets/projects/banking-system.png', quality=95)
    print("banking-system.png generated")

def create_youmate_screenshot():
    w, h = 960, 560
    im = Image.new('RGB', (w, h), color='#1e1e24')
    draw = ImageDraw.Draw(im)
    
    # Top header bar
    draw.rectangle([0, 0, w, 52], fill='#17171c')
    draw.line([0, 52, w, 52], fill='#2c2c36', width=1)
    
    # Window dots
    draw.ellipse([18, 20, 28, 30], fill='#ef4444')
    draw.ellipse([34, 20, 44, 30], fill='#eab308')
    draw.ellipse([50, 20, 60, 30], fill='#22c55e')
    
    # Sidebar
    draw.rectangle([0, 53, 210, h], fill='#19191e')
    draw.line([210, 53, 210, h], fill='#2c2c36', width=1)
    
    nav_items = [("Utility Suite", True), ("SEO Inspector", False), ("Edge Streaming", False), ("OG Image Gen", False), ("Lighthouse Radar", False)]
    for i, (name, active) in enumerate(nav_items):
        y = 80 + i * 42
        if active:
            draw.rectangle([14, y, 196, y + 32], fill='#8b4513')
        else:
            draw.rectangle([14, y, 196, y + 32], outline='#2c2c36', width=1)
            
    # Metrics
    cards = [
        ("LIGHTHOUSE", "99 / 100", "Performance", "#f97316"),
        ("TTFB (EDGE)", "45 ms", "Global CDN", "#38bdf8"),
        ("SEO METAS", "100% VALID", "Automated OG", "#22c55e"),
        ("TYPESCRIPT", "STRICT", "Zero Any Types", "#a855f7")
    ]
    card_w = 168
    for i, (label, val, sub, col) in enumerate(cards):
        x = 230 + i * (card_w + 14)
        y = 75
        draw.rectangle([x, y, x + card_w, y + 84], fill='#25252e', outline='#383846', width=1)
        draw.line([x, y, x + card_w, y], fill=col, width=2)
        
    # Main content / preview
    draw.rectangle([230, 180, w - 24, h - 24], fill='#17171d', outline='#33333f', width=1)
    draw.rectangle([230, 180, w - 24, 218], fill='#23232c')
    draw.line([230, 218, w - 24, 218], fill='#33333f', width=1)
    
    # Utility Panels in main area
    draw.rectangle([250, 235, 560, h - 45], fill='#202028', outline='#353544', width=1)
    draw.rectangle([580, 235, w - 45, h - 45], fill='#202028', outline='#353544', width=1)
    
    # Inner elements
    draw.rectangle([270, 260, 540, 290], fill='#2c2c38')
    draw.rectangle([270, 310, 540, 420], fill='#181820', outline='#383848', width=1)
    
    draw.rectangle([600, 260, w - 65, 300], fill='#38bdf8')
    draw.rectangle([600, 320, w - 65, 360], fill='#22c55e')
    draw.rectangle([600, 380, w - 65, 420], fill='#f59e0b')
    
    im.save('public/assets/projects/youmate.png', quality=95)
    print("youmate.png generated")

if __name__ == '__main__':
    create_task_manager_screenshot()
    create_banking_screenshot()
    create_youmate_screenshot()
