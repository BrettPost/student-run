import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trophy, Target, Award, Plus, Edit, Trash2, ArrowRight, Star, CheckCircle, Circle, MapPin, Users, TrendingUp } from 'lucide-react';

const ProgressPage = ({ students, prizes, achievements }) => {
	const queryClient = useQueryClient();
	const [showAddAchievement, setShowAddAchievement] = useState(false);
	const [showAddReward, setShowAddReward] = useState(false);
	const [newAchievement, setNewAchievement] = useState({ name: '', description: '', lapsRequired: '' });
	const [newReward, setNewReward] = useState({ type: '', title: '', description: '', milestone: 0 });
	//const [rewards, setRewards] = useState([
	//	{ id: 1, name: 'Sticker Pack', description: 'Cool running stickers', lapsRequired: 3, unlocked: false },
	//	{ id: 2, name: 'Water Bottle', description: 'Personalized water bottle', lapsRequired: 7, unlocked: false },
	//	{ id: 3, name: 'Trophy', description: 'Golden running trophy', lapsRequired: 10, unlocked: false },
	//]);

	const totalStudents = students.length;
	const totalLapsCompleted = students.reduce((sum, student) => sum + student.laps, 0);
	const totalCardsCompleted = students.reduce((sum, student) => sum + student.miles, 0);

	const roadmapSteps = [
		{ id: 1, name: 'First Steps', description: 'Complete your first lap', lapsRequired: 1, icon: '👶', color: 'blue' },
		{ id: 2, name: 'Getting Started', description: 'Complete 3 laps', lapsRequired: 3, icon: '🏃‍♂️', color: 'green' },
		{ id: 3, name: 'Halfway Hero', description: 'Complete 5 laps', lapsRequired: 5, icon: '🎯', color: 'yellow' },
		{ id: 4, name: 'Almost There', description: 'Complete 8 laps', lapsRequired: 8, icon: '💪', color: 'orange' },
		{ id: 5, name: 'Marathon Master', description: 'Complete all 10 laps', lapsRequired: 10, icon: '🏆', color: 'purple' },
	];

	//const getStudentProgress = (student) => {
	//  return Math.round((student.lapsCompleted / student.totalLaps) * 100);
	//};

	const addPrize = useMutation({
		mutationFn: async (newPrize) => {
			const response = await fetch('api/prize', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newPrize)
			})

			if (!response.ok) {
				throw new Error('Failed to add Prize');
			}

			return response.json();
		},

		onMutate: async (newPrize) => {
			console.log("updating: ", newPrize.title);

			await queryClient.cancelQueries({ queryKey: ['prizes'] });
			console.log("Cancelled Pending Prize Queries");

			const prevPrizes = queryClient.getQueryData(['prizes']);
			console.log("Saved snapshot of Prizes:", prevPrizes?.length || 0);

			queryClient.setQueryData(['prizes'], (oldData) => {
				if (!oldData) {
					console.log("No existing data to update");
					return oldData;
				}

				const timestamp = Date.now();
				var optimisticPrize = {
					id: timestamp,
					type: newPrize.type,
					title: newPrize.title,
					description: newPrize.description,
					milestone: newPrize.milestone,
				};

				console.log("Optimistic Prize Created", optimisticPrize.title, optimisticPrize.id);

				const updatedPrizes = [
					...oldData,
					optimisticPrize
				];

				console.log("Updated Cache with optimistic data. New Count:", updatedPrizes.length);

				return updatedPrizes;
			})

			return {
				prevPrizes,
				optimisticPrizeTitle: newPrize.title
			}
		},

		onError: (error, _newPrize, context) => {
			console.log("Mutation Failed for:", context?.optimisticPrizeTitle);
			console.log("Error:", error.message);

			if (context?.optimisticPrizeTitle) {
				queryClient.setQueryData(['prizes'], context.optimisticPrizeTitle);
				console.log("Rolled back to previous state");
			}

			console.log("Failed to add new Prize:", error)
		},

		onSuccess: (serverResponse) => {
			console.log("Success. Server confirmed new prize");
			console.log("Server assigned Id:", serverResponse.Id, "for", serverResponse.title);

			setNewReward({ type: '', title: '', description: '', milestone: 0 });
		},

		onSettled: (_data, error) => {
			console.log("Syncing with server state");

			queryClient.invalidateQueries({ queryKey: ['prizes'] });

			if (error) {
				console.log("Settled after error. Cache should be rolled back");
			} else {
				console.log("Settled after success. Server data will replace optimistic data");
			}
		}

	})

	const getStepStatus = (lapsRequired) => {
		const completedStudents = students.filter(student => student.lapsCompleted >= lapsRequired).length;
		const totalStudents = students.length;
		return {
			completed: completedStudents,
			total: totalStudents,
			percentage: totalStudents > 0 ? Math.round((completedStudents / totalStudents) * 100) : 0
		};
	};

	const handleAddAchievement = (e) => {
		e.preventDefault();
		if (newAchievement.name && newAchievement.description && newAchievement.lapsRequired) {
			const achievement = {
				id: achievements.length + 1,
				...newAchievement,
				lapsRequired: parseInt(newAchievement.lapsRequired),
				unlocked: false
			};
			//onUpdateAchievements([...achievements, achievement]);
			setNewAchievement({ name: '', description: '', lapsRequired: '' });
			setShowAddAchievement(false);
		}
	};

	const handleAddPrize = (e) => {
		e.preventDefault();
		if (newReward.type && newReward.title && newReward.description && newReward.milestone) {
			addPrize.mutate(newReward);
		}
	};

	const getColorClasses = (color) => {
		const colors = {
			blue: 'bg-blue-100 text-blue-800 border-blue-200',
			green: 'bg-green-100 text-green-800 border-green-200',
			yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
			orange: 'bg-orange-100 text-orange-800 border-orange-200',
			purple: 'bg-purple-100 text-purple-800 border-purple-200',
		};
		return colors[color] || colors.blue;
	};

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-4xl font-bold text-gray-900">Progress Roadmap</h1>
					<p className="text-gray-600 mt-2">Track achievements and celebrate milestones</p>
				</div>
				<div className="flex space-x-3">
					<button
						onClick={() => setShowAddAchievement(true)}
						className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
					>
						<Plus className="h-4 w-4" />
						<span>Add Achievement</span>
					</button>
					<button
						onClick={() => setShowAddReward(!showAddReward)}
						className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
					>
						<Trophy className="h-4 w-4" />
						<span>Add Prize</span>
					</button>
				</div>
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
					<div className="flex items-center space-x-3">
						<div className="p-3 bg-blue-100 rounded-lg">
							<Users className="h-6 w-6 text-blue-600" />
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
							<p className="text-sm text-gray-600">Total Students</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
					<div className="flex items-center space-x-3">
						<div className="p-3 bg-green-100 rounded-lg">
							<Target className="h-6 w-6 text-green-600" />
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">{totalLapsCompleted}</p>
							<p className="text-sm text-gray-600">Laps Completed</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
					<div className="flex items-center space-x-3">
						<div className="p-3 bg-purple-100 rounded-lg">
							<TrendingUp className="h-6 w-6 text-purple-600" />
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">{totalCardsCompleted}</p>
							<p className="text-sm text-gray-600">Mileage Completed</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
					<div className="flex items-center space-x-3">
						<div className="p-3 bg-yellow-100 rounded-lg">
							<Award className="h-6 w-6 text-yellow-600" />
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">{achievements.length}</p>
							<p className="text-sm text-gray-600">Achievements</p>
						</div>
					</div>
				</div>
			</div>

			{/* Prizes Section */}
			<div className="p-6">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Prizes</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{prizes.map((reward) => (
						<div
							key={reward.id}
							className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
						>
							<div className="flex items-start justify-between mb-4">
								<div className="flex items-center space-x-3">
									<div className="p-3 bg-indigo-100 rounded-lg">
										<Trophy className="h-6 w-6 text-yellow-600" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-gray-900">
											{reward.title}
										</h3>
										<p className="text-gray-600">{reward.description}</p>
									</div>
								</div>
								<div className="flex space-x-2">
									<button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
										<Edit className="h-4 w-4" />
									</button>
									<button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
										<Trash2 className="h-4 w-4" />
									</button>
								</div>
							</div>

							<div className="space-y-3">
								<div className="flex items-center space-x-2 text-sm text-gray-600">
									<span>Type: {reward.type}</span>
								</div>
							</div>

							<Link
								to={`prizes/${reward.id}`}
								className="mt-4 inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold group"
							>
								<span>Edit Prize</span>
								<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
							</Link>
						</div>
					))}
				</div>
			</div>

			{/* Roadmap */}
			<div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Achievement Roadmap</h2>
				<div className="space-y-6">
					{roadmapSteps.map((step, index) => {
						const status = getStepStatus(step.lapsRequired);
						const isLast = index === roadmapSteps.length - 1;

						return (
							<div key={step.id} className="relative">
								<div className="flex items-center space-x-4">
									{/* Connection Line */}
									{!isLast && (
										<div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
									)}

									{/* Step Icon */}
									<div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center text-2xl ${getColorClasses(step.color)}`}>
										{step.icon}
									</div>

									{/* Step Content */}
									<div className="flex-1 bg-gray-50 rounded-lg p-4">
										<div className="flex items-center justify-between mb-2">
											<h3 className="text-lg font-semibold text-gray-900">{step.name}</h3>
											<span className="text-sm text-gray-600">{step.lapsRequired} laps</span>
										</div>
										<p className="text-gray-600 mb-3">{step.description}</p>

										{/* Progress Bar */}
										<div className="space-y-2">
											<div className="flex justify-between text-sm">
												<span className="text-gray-600">Students completed</span>
												<span className="font-semibold text-gray-900">{status.completed}/{status.total}</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div
													className="bg-green-500 h-2 rounded-full transition-all duration-300"
													style={{ width: `${status.percentage}%` }}
												></div>
											</div>
											<p className="text-sm text-gray-600">{status.percentage}% of students achieved this milestone</p>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Add Achievement Modal */}
			{showAddAchievement && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-xl p-6 w-full max-w-md">
						<h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Achievement</h3>
						<form onSubmit={handleAddAchievement} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
								<input
									type="text"
									value={newAchievement.name}
									onChange={(e) => setNewAchievement({ ...newAchievement, name: e.target.value })}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									placeholder="Achievement name"
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
								<input
									type="text"
									value={newAchievement.description}
									onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									placeholder="Achievement description"
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Laps Required</label>
								<input
									type="number"
									value={newAchievement.lapsRequired}
									onChange={(e) => setNewAchievement({ ...newAchievement, lapsRequired: e.target.value })}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									placeholder="Number of laps"
									min="1"
									required
								/>
							</div>
							<div className="flex space-x-3">
								<button
									type="submit"
									className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
								>
									Add Achievement
								</button>
								<button
									type="button"
									onClick={() => setShowAddAchievement(false)}
									className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Add Prize Modal */}
			{showAddReward && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-xl p-6 w-full max-w-md">
						<h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Prize</h3>
						<form onSubmit={handleAddPrize} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Type
								</label>
								<select
									name="type"
									value={newReward.type}
									onChange={(e) => setNewReward({ ...newReward, type: e.target.value })}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									required
								>
									<option value="">Select Type</option>
									<option value="laps">Laps</option>
									<option value="tracks">Tracks</option>
									{/*<option value="miles">Miles</option>*/}
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
								<input
									type="text"
									value={newReward.title}
									onChange={(e) => setNewReward({ ...newReward, title: e.target.value })}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									placeholder="Reward name"
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
								<input
									type="text"
									value={newReward.description}
									onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									placeholder="Reward description"
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Milestone</label>
								<input
									type="number"
									value={newReward.milestone}
									onChange={(e) => setNewReward({ ...newReward, milestone: e.target.value })}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									placeholder="Number of laps"
									min="1"
									max="1000000000"
									required
								/>
							</div>
							<div className="flex space-x-3">
								<button
									type="submit"
									className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
								>
									Add Prize
								</button>
								<button
									type="button"
									onClick={() => setShowAddReward(false)}
									className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProgressPage;
