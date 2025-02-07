import { IconCloud } from '@/ui/magic'
import act from '@/assets/icons/act.jpg'
import ai16z from '@/assets/icons/ai16z.jpg'
import bonk from '@/assets/icons/bonk.jpg'
import fwog from '@/assets/icons/fwog.png'
import giga from '@/assets/icons/giga.png'
import goat from '@/assets/icons/goat.jpg'
import griffain from '@/assets/icons/griffain.png'
import jup from '@/assets/icons/jup.png'
import llm from '@/assets/icons/llm.png'
import me from '@/assets/icons/me.png'
import moodeng from '@/assets/icons/moodeng.png'
import pengu from '@/assets/icons/pengu.png'
import ppcoin from '@/assets/icons/ppcoin.jpg'
import ray from '@/assets/icons/ray.jpg'
import render from '@/assets/icons/render.png'
import solana from '@/assets/icons/solana.png'
import tnsr from '@/assets/icons/tnsr.png'
import trisig from '@/assets/icons/trisig.jpg'
import wif from '@/assets/icons/wif.jpg'
import zerebro from '@/assets/icons/zerebro.png'

const images = [
	act, ai16z, ppcoin, bonk, fwog, giga, goat, griffain, jup, llm, me, ppcoin,
	moodeng, pengu, ppcoin, ray, render, solana, tnsr, trisig, wif, ppcoin, zerebro
]

export function SplashCloud() { return <IconCloud images={images} /> }