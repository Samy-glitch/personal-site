from bs4 import BeautifulSoup
from datetime import datetime
import requests
import time
import json



def get_data():

  now = datetime.now()


  dt_string = now.strftime("%I:%M %p | %d/%m/%Y")
  dt_raw = now.strftime("%Y/%m/%d %H:%M")
  print("last updated: ", dt_string)
  print("last updated raw: ", dt_raw)



  html_text = requests.get('https://myanimelist.net/profile/Samy_only').text

  soup = BeautifulSoup(html_text, 'lxml')
  anime_all = soup.find('div', class_='stats anime')
  anime_list = anime_all.find_all('span', class_='di-ib fl-r lh10')
  anime_list_2 = anime_all.find_all('span', class_='di-ib fl-r')

  manga_all = soup.find('div', class_='stats manga')
  manga_list = manga_all.find_all('span', class_='di-ib fl-r')


  wached_episodes = anime_list_2[2].text
  wached_anime = anime_list[1].text
  read_manga = manga_list[2].text
  print(f'Wached Episode : {wached_episodes}')
  print(f'Wached Anime : {wached_anime}')
  print(f'Read Manga : {read_manga}') 

  dictionary = {
    "episode": wached_episodes,
    "anime": wached_anime,
    "manga": read_manga,
    "lastUpdated": dt_string,
    "lastUpdatedRaw": dt_raw
  }

  with open("sample.json", "w") as outfile:
    json.dump(dictionary, outfile)



if __name__ == '__main__':
  get_data()
  """ while True:
    get_data()
    time.sleep(3600) """
    
