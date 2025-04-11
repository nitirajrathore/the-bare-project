history | tr -s ' ' | cut -d ' ' -f 3- | grep -v history | sort | uniq 
