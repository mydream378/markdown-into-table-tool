
import re

list_a_text = """
Left-LGN 303.199231 
Left-MGN 126.280718 
Left-PuI 316.199687 
Left-PuM 1252.526558 
Left-L-Sg 28.052934 
Left-VPL 1006.977123 
Left-CM 257.181010 
Left-VLa 647.018666 
Left-PuA 227.317872 
Left-MDm 747.679978 
Left-Pf 59.641213 
Left-VAmc 33.786450 
Left-MDl 260.622635 
Left-CeM 66.745546 
Left-VA 424.601852 
Left-MV(Re) 11.463548 
Left-VM 22.167699 
Left-CL 22.966592 
Left-PuL 211.323299 
Left-Pt 7.785588 
Left-AV 114.750135 
Left-Pc 3.943194 
Left-VLp 858.813823 
Left-LP 116.076829 
Right-LGN 269.045382 
Right-MGN 128.640826 
Right-PuI 272.346834 
Right-PuM 1202.860683 
Right-L-Sg 29.946815 
Right-VPL 982.461770 
Right-CM 250.186624 
Right-VLa 684.275195 
Right-PuA 237.521340 
Right-MDm 789.883255 
Right-Pf 58.223615 
Right-VAmc 34.257639 
Right-MDl 313.340272 
Right-VA 466.711492 
Right-MV(Re) 10.657177 
Right-CeM 58.997370 
Right-VM 20.957238 
Right-PuL 215.482298 
Right-CL 20.956634 
Right-VLp 889.174973 
Right-Pc 3.912364 
Right-Pt 7.403586 
Right-AV 115.615660 
Right-LP 112.120409 
Left-LD 18.260235 
Right-LD 10.896759 
Left-Whole_thalamus 7145.382416 
Right-Whole_thalamus 7185.876209 
"""

list_b_text = """
8103 Left-AV 
8104 Left-CM 
8105 Left-CL 
8106 Left-CM 
8108 Left-LD 
8109 Left-LGN 
8110 Left-LP 
8111 Left-LSg 
8112 Left-MDI 
8113 Left-MDm 
8115 Left-MGN 
8116 Left-MV(Re) 
8118 Left-Pf 
8120 Left-PuI 
8121 Left-PuA 
8122 Left-PuL 
8123 Left-PuM 
8126 Left-VA 
8127 Left-VAmc 
8128 Left-VLa 
8129 Left-VLP 
8130 Left-VMP 
8133 Left-VPL
"""

# Parse List A
list_a = []
for line in list_a_text.strip().split('\n'):
    parts = line.split()
    if len(parts) >= 2:
        name = parts[0]
        val = parts[1]
        list_a.append({'name': name, 'val': val})

# Parse List B
list_b = {}
for line in list_b_text.strip().split('\n'):
    parts = line.split()
    if len(parts) >= 2:
        id_val = parts[0]
        name = parts[1]
        list_b[name] = id_val

# Manual fixes map (Fuzzy matching logic)
# Map A-name to B-name
fuzzy_map = {
    'Left-L-Sg': 'Left-LSg',
    'Left-MDl': 'Left-MDI', # Assuming MDI in list B is meant to match MDl
    'Left-VLp': 'Left-VLP',
    'Left-VM': 'Left-VMP', # Closest match assumption
}

# Process Alignment
print(f"{'ROI Name':<25} | {'Volume':<15} | {'Index ID':<10} | {'Match Status/Note'}")
print("-" * 80)

for item in list_a:
    name_a = item['name']
    val_a = item['val']
    
    id_b = ""
    status = ""
    
    # 1. Exact Match
    if name_a in list_b:
        id_b = list_b[name_a]
        status = "Exact Match"
    
    # 2. Fuzzy Match (Pre-defined)
    elif name_a in fuzzy_map and fuzzy_map[name_a] in list_b:
        mapped_name = fuzzy_map[name_a]
        id_b = list_b[mapped_name]
        status = f"Matched to {mapped_name}"
    
    # 3. Check for Right side (Heuristic: Right usually matches Left ID + 100 in FS, but here we just note it)
    elif name_a.startswith("Right-"):
        # Try to find corresponding Left match to hint
        left_equivalent = name_a.replace("Right-", "Left-")
        if left_equivalent in list_b:
             status = f"Right Side (Left ID: {list_b[left_equivalent]})"
        elif left_equivalent in fuzzy_map and fuzzy_map[left_equivalent] in list_b:
             status = f"Right Side (Left ID: {list_b[fuzzy_map[left_equivalent]]})"
        else:
             status = "Right Side (No Left match)"
    
    else:
        status = "No Match"

    print(f"{name_a:<25} | {val_a:<15} | {id_b:<10} | {status}")
